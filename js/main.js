document.addEventListener("DOMContentLoaded", function () {
  // Event listeners (using more descriptive variable names)
  const userReadCheckbox = document.getElementById("userReadCheckbox");
  const userWriteCheckbox = document.getElementById("userWriteCheckbox");
  const userExecuteCheckbox = document.getElementById("userExecuteCheckbox");
  const groupReadCheckbox = document.getElementById("groupReadCheckbox");
  const groupWriteCheckbox = document.getElementById("groupWriteCheckbox");
  const groupExecuteCheckbox = document.getElementById("groupExecuteCheckbox");
  const otherReadCheckbox = document.getElementById("otherReadCheckbox");
  const otherWriteCheckbox = document.getElementById("otherWriteCheckbox");
  const otherExecuteCheckbox = document.getElementById("otherExecuteCheckbox");
  const filePermissionsInputChar = document.getElementById("filePermissionsInputChar");
  const filePermissionsInputNum = document.getElementById("filePermissionsInputNum");

  // Function to calculate and display permissions (combined for efficiency)
  function updatePermissions() {
    const userPermissions = getUserPermissions();
    const groupPermissions = getGroupPermissions();
    const othersPermissions = getOthersPermissions();
    const symbolicPermissions = `${userPermissions}${groupPermissions}${othersPermissions}`;
    const numericPermissions = parseInt(symbolicPermissions.replace(/r/g, '4').replace(/w/g, '2').replace(/x/g, '1').replace(/-/g, '0'), 8);

    filePermissionsInputChar.value = symbolicPermissions;
    filePermissionsInputNum.value = numericPermissions;
  }

  // Update from character input
  function updateFromCharInput(event) {
    const inputPermissions = event.target.value.toUpperCase(); 
    if (inputPermissions.length === 9 && /^[rwx-]{9}$/.test(inputPermissions)) {
      updateUserCheckboxes(inputPermissions.slice(0, 3));
      updateGroupCheckboxes(inputPermissions.slice(3, 6));
      updateOthersCheckboxes(inputPermissions.slice(6, 9));
      // Update numeric input based on the updated checkboxes
      updatePermissions(); 
    }
  }

  // Update from numeric input
  function updateFromNumInput() {
    let numPermissions = parseInt(filePermissionsInputNum.value, 10); // Parse as base 10
    if (isNaN(numPermissions) || numPermissions < 0 || numPermissions > 511) {
      // Handle invalid input (optional: display an error message)
      return; 
    }
    const permissions = numPermissions.toString(8).padStart(3, '0');
    filePermissionsInputChar.value = permissions
      .replace(/4/g, 'r---')
      .replace(/5/g, 'r-x-')
      .replace(/6/g, 'rw--')
      .replace(/7/g, 'rwx-')
      .replace(/2/g, '-w--')
      .replace(/3/g, '-wx-')
      .replace(/1/g, '--x-')
      .replace(/0/g, '----');

    updateFromCharInput({ target: { value: filePermissionsInputChar.value } }); // Update checkboxes based on converted permissions
  }

  // Event listeners for input fields (using keyup for immediate response)
  filePermissionsInputChar.addEventListener("keyup", updateFromCharInput);
  filePermissionsInputNum.addEventListener("keyup", updateFromNumInput);

  // ... (Rest of the code, including permission calculation and checkbox update functions, remains similar)
  // User permissions
  function getUserPermissions() {
    return getPermissions(
      userReadCheckbox,
      userWriteCheckbox,
      userExecuteCheckbox
    );
  }

  // Group Permissions
  function getGroupPermissions() {
    return getPermissions(
      groupReadCheckbox,
      groupWriteCheckbox,
      groupExecuteCheckbox
    );
  }

  // Other Permissions
  function getOthersPermissions() {
    return getPermissions(
      otherReadCheckbox,
      otherWriteCheckbox,
      otherExecuteCheckbox
    );
  }

  function getPermissions(readCheckbox, writeCheckbox, executeCheckbox) {
    const readPermission = readCheckbox.checked ? "r" : "-";
    const writePermission = writeCheckbox.checked ? "w" : "-";
    const executePermission = executeCheckbox.checked ? "x" : "-";

    return `${readPermission}${writePermission}${executePermission}`;
  }

  updateUserCheckboxes = function (permissions) {
    userReadCheckbox.checked = permissions.includes('r');
    userWriteCheckbox.checked = permissions.includes('w');
    userExecuteCheckbox.checked = permissions.includes('x');
  };

  updateGroupCheckboxes = function (permissions) {
    groupReadCheckbox.checked = permissions.includes('r');
    groupWriteCheckbox.checked = permissions.includes('w');
    groupExecuteCheckbox.checked = permissions.includes('x');
  };

  updateOthersCheckboxes = function (permissions) {
    otherReadCheckbox.checked = permissions.includes('r');
    otherWriteCheckbox.checked = permissions.includes('w');
    otherExecuteCheckbox.checked = permissions.includes('x');
  };

  // Initial call to updatePermissions to display default values 
  updatePermissions(); 

  // Attach event listeners to checkboxes to trigger updates
  const checkboxes = [
    userReadCheckbox, userWriteCheckbox, userExecuteCheckbox,
    groupReadCheckbox, groupWriteCheckbox, groupExecuteCheckbox,
    otherReadCheckbox, otherWriteCheckbox, otherExecuteCheckbox
  ];
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", updatePermissions);
  });
});