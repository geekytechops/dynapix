<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Media Entry Form</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #212121;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      margin: 0;
    }
    .card {
      width: 100%;
      max-width: 600px;
      padding: 30px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 10px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8);
    }
    .form-control {
      background-color: #444;
      border: 1px solid #555;
      color: #fff;
    }
    .form-control:focus {
      background-color: #444;
      color: #fff;
      border-color: #777;
      box-shadow: none;
    }
    .btn-primary {
      background-color: #5A9;
      border: none;
    }
    .btn-primary:hover {
      background-color: #4A8;
    }
    .error-message {
      color: #f00;
      font-size: 0.9em;
      display: none;
    }
    .additional-fields {
      display: none;
    }
  </style>
</head>
<body>
  <div class="card">
    <h3 class="text-center mb-4">Media Information</h3>
    <form id="mediaForm">
      <div class="mb-3">
        <label for="mediaType" class="form-label">Media Type</label>
        <select name="mediaType" id="mediaType" class="form-select">
          <option value="1">Mall</option>
          <option value="2">Theatre</option>
          <option value="3">Fuel Station</option>
        </select>
        <div class="error-message" id="TypeError">Please select a valid Type.</div>
      </div>
      <div class="mb-3">
        <label for="mediaTitle" class="form-label">Media Title</label>
        <input type="text" class="form-control" id="mediaTitle" name="mediaTitle" placeholder="Enter media title" required>
        <div class="error-message" id="titleError">Please enter a valid title.</div>
      </div>
      <div class="mb-3">
        <label for="mediaImage" class="form-label">Media Image</label>
        <input type="file" class="form-control" id="mediaImage" name="mediaImage" accept="image/*" required>
        <div class="error-message" id="imageError">Please upload a valid image.</div>
      </div>
      <div class="mb-3">
        <label for="mediaDescription" class="form-label">Media Description</label>
        <textarea class="form-control" id="mediaDescription" name="mediaDescription" rows="3" placeholder="Enter media description" required></textarea>
        <div class="error-message" id="descriptionError">Please enter a description.</div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="mediaFootfalls" class="form-label">Approximate Footfalls</label>
          <input type="number" class="form-control" id="mediaFootfalls" name="mediaFootfalls" placeholder="Footfalls" required>
          <div class="error-message" id="footfallsError">Please enter a positive number.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="mediaDuration" class="form-label">Media Duration (in seconds)</label>
          <input type="number" class="form-control" id="mediaDuration" name="mediaDuration" placeholder="Duration" required>
          <div class="error-message" id="durationError">Please enter a valid duration.</div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label for="mediaScreens" class="form-label">Number of Screens</label>
          <input type="number" class="form-control" id="mediaScreens" name="mediaScreens" placeholder="Screens" required>
          <div class="error-message" id="screensError">Please enter a positive number.</div>
        </div>
        <div class="col-md-6 mb-3">
          <label for="mediaSlots" class="form-label">Number of Slots</label>
          <input type="number" class="form-control" id="mediaSlots" name="mediaSlots" placeholder="Slots" required>
          <div class="error-message" id="slotsError">Please enter a positive number.</div>
        </div>
      </div>

      <!-- Additional Fields for Fuel Station -->
      <div class="additional-fields">
        <div class="mb-3">
          <label for="mediaLocationType" class="form-label">Media Location Type</label>
          <input type="text" class="form-control" id="mediaLocationType" name="mediaLocationType" placeholder="Enter location type">
          <div class="error-message" id="locationTypeError">Please enter a valid location type.</div>
        </div>
        <div class="mb-3">
          <label for="mediaSize" class="form-label">Media Size</label>
          <input type="text" class="form-control" id="mediaSize" name="mediaSize" placeholder="Enter media size">
          <div class="error-message" id="sizeError">Please enter a valid size.</div>
        </div>
        <div class="mb-3">
          <label for="mediaLoopTime" class="form-label">Media Loop Time</label>
          <input type="number" class="form-control" id="mediaLoopTime" name="mediaLoopTime" placeholder="Enter loop time in seconds">
          <div class="error-message" id="loopTimeError">Please enter a valid loop time.</div>
        </div>
        <input type="hidden" name="formName" id="formName" value="add_new_media">
      </div>

      <button type="submit" class="btn btn-primary w-100" id="submitForm">Submit Media Information</button>
    </form>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    // Show or hide additional fields based on media type selection
    $('#mediaType').change(function() {
      if ($(this).val() == '3') { // Show additional fields for Fuel Station
        $('.additional-fields').show();
      } else {
        $('.additional-fields').hide();
      }
    });

    $('#submitForm').click(function(e) {
      e.preventDefault();

      // Input values
      let formData = new FormData($('#mediaForm')[0]);

      // Validation flags
      let isValid = true;

      // Validate all fields as before
      if($('#mediaTitle').val() === '') { $('#titleError').show(); isValid = false; } else { $('#titleError').hide(); }
      if($('#mediaImage').val() === '') { $('#imageError').show(); isValid = false; } else { $('#imageError').hide(); }
      if($('#mediaDescription').val() === '') { $('#descriptionError').show(); isValid = false; } else { $('#descriptionError').hide(); }
      if($('#mediaFootfalls').val() === '' || $('#mediaFootfalls').val() <= 0) { $('#footfallsError').show(); isValid = false; } else { $('#footfallsError').hide(); }
      if($('#mediaDuration').val() === '' || $('#mediaDuration').val() <= 0) { $('#durationError').show(); isValid = false; } else { $('#durationError').hide(); }
      if($('#mediaScreens').val() === '' || $('#mediaScreens').val() <= 0) { $('#screensError').show(); isValid = false; } else { $('#screensError').hide(); }
      if($('#mediaSlots').val() === '' || $('#mediaSlots').val() <= 0) { $('#slotsError').show(); isValid = false; } else { $('#slotsError').hide(); }

      
      if ($('#mediaType').val() == '3') {
        if($('#mediaLocationType').val() === '') { $('#locationTypeError').show(); isValid = false; } else { $('#locationTypeError').hide(); }
        if($('#mediaSize').val() === '') { $('#sizeError').show(); isValid = false; } else { $('#sizeError').hide(); }
        if($('#mediaLoopTime').val() === '' || $('#mediaLoopTime').val() <= 0) { $('#loopTimeError').show(); isValid = false; } else { $('#loopTimeError').hide(); }
      }

      
      if(isValid) {
        $.ajax({
          url: 'data_handle',
          type: 'POST',
          data: formData,
          processData: false,
          contentType: false,
          success: function(response) {
            alert('Data submitted successfully!');
            
            $('#mediaForm')[0].reset();
          },
          error: function(xhr, status, error) {
            alert('An error occurred: ' + error);
          }
        });
      }
    });
  </script>
</body>
</html>
