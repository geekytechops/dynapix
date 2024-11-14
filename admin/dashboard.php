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
  </style>
</head>
<body>
  <div class="card">
    <h3 class="text-center mb-4">Media Information</h3>
    <form id="mediaForm">
      <div class="mb-3">
        <label for="mediaType" class="form-label">Media Title</label>
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
      <button type="submit" class="btn btn-primary w-100" id="submitForm">Submit Media Information</button>
    </form>
  </div>

  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script>
    $('#submitForm').click(function(e) {
      e.preventDefault();
      
      // Input values
      let mediaTitle = $('#mediaTitle').val();
      let mediaImage = $('#mediaImage').val();
      let mediaDescription = $('#mediaDescription').val();
      let mediaFootfalls = $('#mediaFootfalls').val();
      let mediaDuration = $('#mediaDuration').val();
      let mediaScreens = $('#mediaScreens').val();
      let mediaSlots = $('#mediaSlots').val();

      // Validation flags
      let isValid = true;

      // Validate Media Title
      if(mediaTitle === '') {
        $('#titleError').show();
        isValid = false;
      } else {
        $('#titleError').hide();
      }

      // Validate Media Image
      if(mediaImage === '') {
        $('#imageError').show();
        isValid = false;
      } else {
        $('#imageError').hide();
      }

      // Validate Media Description
      if(mediaDescription === '') {
        $('#descriptionError').show();
        isValid = false;
      } else {
        $('#descriptionError').hide();
      }

      // Validate Footfalls (should be a positive number)
      if(mediaFootfalls === '' || mediaFootfalls <= 0) {
        $('#footfallsError').show();
        isValid = false;
      } else {
        $('#footfallsError').hide();
      }

      // Validate Duration (should be a positive number)
      if(mediaDuration === '' || mediaDuration <= 0) {
        $('#durationError').show();
        isValid = false;
      } else {
        $('#durationError').hide();
      }

      // Validate Screens (should be a positive number)
      if(mediaScreens === '' || mediaScreens <= 0) {
        $('#screensError').show();
        isValid = false;
      } else {
        $('#screensError').hide();
      }

      // Validate Slots (should be a positive number)
      if(mediaSlots === '' || mediaSlots <= 0) {
        $('#slotsError').show();
        isValid = false;
      } else {
        $('#slotsError').hide();
      }

      // Submit the form if all fields are valid
      if(isValid) {
        $('#mediaForm').submit();
      }
    });
  </script>
</body>
</html>
