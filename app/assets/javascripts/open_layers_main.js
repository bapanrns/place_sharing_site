window.onload = init;

function init(){
	location_data  = fetch_user_all_location();
	const markerSVGData = "data:image/svg+xml,%3Csvg width='36px' height='36px' viewBox='-18 -18 36 36' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Eround-marker%3C/title%3E%3Cg stroke-width='3' stroke='%236af'%3E%3Ccircle fill='%23fc2' fill-opacity='0.7' r='16'/%3E%3Ccircle r='1.5'/%3E%3C/g%3E%3C/svg%3E";
            
	let style = new ol.style.Style({
		image: new ol.style.Icon({
			opacity: 1,
			scale: 0.5,
			src: markerSVGData
		})
	});
	let iconFeatures = []
	$.each(location_data, function (key, obj) {
		iconFeatures.push(
			new ol.Feature({
				geometry: new ol.geom.Point(ol.proj.fromLonLat([obj["longitude"], obj["latitude"]]))
			})
		)
	})
	
	iconFeatures.forEach(function(feature) { feature.setStyle(style); });
	const vectorLayer = new ol.layer.Vector({
		source: new ol.source.Vector({
			features: iconFeatures
		})
	});
		
	const map = new ol.Map({
		view: new ol.View({
			center: ol.proj.fromLonLat([88.51775702628468, 22.51078409997254]),
            zoom: 6
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			}),
			vectorLayer
		],
		target: 'web-map'
	})
	map.on('click', function(evt){
		var coords = ol.proj.toLonLat(evt.coordinate);
		var latitude = coords[1];
		var longitude = coords[0];
		openLatitudeLongitudeSaveModal(latitude, longitude);
	})
}

function openLatitudeLongitudeSaveModal(latitude, longitude){
	var locTxt = "Latitude: " + latitude + " Longitude: " + longitude;
	$("#latitude").val(latitude);
	$("#longitude").val(longitude);
	$("#save_for_private").prop("checked", true);
	$("#lat_lon_save_Modal").modal('show');
}

function save_and_share_location(){
	var save_for = $('input[name="save_location"]:checked').val();
	var latitude = $("#latitude").val();
	var longitude = $("#longitude").val();
	var users = [];
	var user_id = $("#user_id").val();
	if(save_for == "individual"){
		$('.select_user:checked').each(function(i){
		  users[i] = $(this).val();
		});
		users.push(user_id);
	}else if(save_for == "public"){
		users.push(0);
	}else{
		users.push(user_id);
	}
	$.ajax({
		  type: "POST",
		  url: "save_and_share_location",
		  data: {latitude: latitude, longitude: longitude, users: users},
		  dataType: "text",
		  success: function(resultData){
			  alert("Save successfully");
			  close_lat_lon_Modal();
			  location.reload();
		  }
	});
}

function close_lat_lon_Modal(){
	$("#latitude").val("");
	$("#longitude").val("");
	$("#lat_lon_save_Modal").modal('hide');
}

function close_user_Modal(){
	$("#user_Modal").modal('hide');
}

function fetch_all_user(){
	$("#user_list").html("");
	if($('#save_for_individual').is(':checked')){
		var user_id = $("#user_id").val();
		$.ajax({
			type: "POST",
			url: "fetch_all_users",
			data: {id: user_id},
			dataType: "text",
			success: function(resultData){
				var user_list = "";
				$.each(JSON.parse(resultData), function (key, obj) {
					user_list += "<tr>";
						user_list += "<td><input type='checkbox' class='select_user' onclick='select_all_checkbox()' value='"+obj['id']+"'></td>";
						user_list += "<td>"+obj['username']+"</td>";
						user_list += "<td>"+obj['first_name']+"</td>";
						user_list += "<td>"+obj['last_name']+"</td>";
						user_list += "<td>"+obj['email']+"</td>";
					user_list += "</tr>";
				});
				$("#select_all").prop("checked", false);
				$("#user_list").html(user_list);
				$("#user_Modal").modal('show');
			}
		});
	}else{
		close_user_Modal();
	}
}
function select_all_users(obj){
	if($("#select_all").prop('checked') == true){
		$(".select_user").prop("checked", true);
	}else{
		$(".select_user").prop("checked", false);
	}
}

function select_all_checkbox(){
	var totalCheckboxes = $('.select_user:checkbox').length;
	var numberOfChecked = $('.select_user:checkbox:checked').length;
	var numberNotChecked = totalCheckboxes - numberOfChecked;
	if(totalCheckboxes == numberOfChecked){
		$("#select_all").prop("checked", true);
	}else{
		$("#select_all").prop("checked", false);
	}
}

function fetch_user_all_location(){
	var user_id = $("#user_id").val();
	var selected_user_id = $("#selected_user_id").val();
	var location_data = "";
	$.ajax({
		  type: "POST",
		  url: "fetch_user_all_location",
		  async: false,
		  data: {user_id: user_id, selected_user_id: selected_user_id},
		  dataType: "text",
		  success: function(resultData){
			  location_data = JSON.parse(resultData);
		  }
	});
	return location_data
}