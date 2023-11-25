document.addEventListener("DOMContentLoaded", function () {
  // Event listeners
  // User checkboxes
  const userReadCheckbox = document.getElementById("userReadCheckbox");
  const userWriteCheckbox = document.getElementById("userWriteCheckbox");
  const userExecuteCheckbox = document.getElementById("userExecuteCheckbox");

  // Group checkboxes
  const groupReadCheckbox = document.getElementById("groupReadCheckbox");
  const groupWriteCheckbox = document.getElementById("groupWriteCheckbox");
  const groupExecuteCheckbox = document.getElementById("groupExecuteCheckbox");

  // Other checkboxes
  const otherReadCheckbox = document.getElementById("otherReadCheckbox");
  const otherWriteCheckbox = document.getElementById("otherWriteCheckbox");
  const otherExecuteCheckbox = document.getElementById("otherExecuteCheckbox");

  // File permissions character input
  const filePermissionsInputChar = document.getElementById("filePermissionsInputChar");

  // File permissions Numerical input
  const filePermissionsInputNum = document.getElementById("filePermissionsInputNum");

  // Input listener to character textbox
  filePermissionsInputChar.addEventListener("input", updateCheckboxesFromInputChar);
  filePermissionsInputChar.addEventListener("keyup", updateCheckboxesFromInputChar); // Added this line to handle keyup events

  // Input listener to numerical textbox
  filePermissionsInputNum.addEventListener("input", updateCheckboxesFromInputNum);
  filePermissionsInputNum.addEventListener("keyup", updateCheckboxesFromInputNum); // Added this line to handle keyup events

  // Checkboxes update character input
  userReadCheckbox.addEventListener("change", updateCharInputFromCheckboxes);
  userWriteCheckbox.addEventListener("change", updateCharInputFromCheckboxes);
  userExecuteCheckbox.addEventListener("change", updateCharInputFromCheckboxes);

  groupReadCheckbox.addEventListener("change", updateCharInputFromCheckboxes);
  groupWriteCheckbox.addEventListener("change", updateCharInputFromCheckboxes);
  groupExecuteCheckbox.addEventListener("change", updateCharInputFromCheckboxes);

  otherReadCheckbox.addEventListener("change", updateCharInputFromCheckboxes);
  otherWriteCheckbox.addEventListener("change", updateCharInputFromCheckboxes);
  otherExecuteCheckbox.addEventListener("change", updateCharInputFromCheckboxes);

  // Checkboxes update numerical input
  userReadCheckbox.addEventListener("change", updateNumInputFromCheckboxes);
  userWriteCheckbox.addEventListener("change", updateNumInputFromCheckboxes);
  userExecuteCheckbox.addEventListener("change", updateNumInputFromCheckboxes);

  groupReadCheckbox.addEventListener("change", updateNumInputFromCheckboxes);
  groupWriteCheckbox.addEventListener("change", updateNumInputFromCheckboxes);
  groupExecuteCheckbox.addEventListener("change", updateNumInputFromCheckboxes);

  otherReadCheckbox.addEventListener("change", updateNumInputFromCheckboxes);
  otherWriteCheckbox.addEventListener("change", updateNumInputFromCheckboxes);
  otherExecuteCheckbox.addEventListener("change", updateNumInputFromCheckboxes);

  //character
  function updateCharInputFromCheckboxes() {
    const userPermissions = getUserPermissions();
    const groupPermissions = getGroupPermissions();
    const othersPermissions = getOthersPermissions();

    const result = `${userPermissions}${groupPermissions}${othersPermissions}`;
    filePermissionsInput.value = result;
  }
  
  //numerical
  function updateNumInputFromCheckboxes() {
    const userPermissions = getUserPermissions();
    const groupPermissions = getGroupPermissions();
    const othersPermissions = getOthersPermissions();

    const numPermissions = parseInt(userPermissions + groupPermissions + othersPermissions, 8);
    filePermissionsInputNum.value = numPermissions;
  }

  function updateCheckboxesFromInputChar(inputPermissions) {
    updateUserCheckboxes(inputPermissions.slice(0, 3));
    updateGroupCheckboxes(inputPermissions.slice(3, 6));
    updateOthersCheckboxes(inputPermissions.slice(6, 9));
  }

  function updateCheckboxesFromInputNum() {
    const numPermissions = parseInt(filePermissionsInputNum.value);
    const permissions = numPermissions.toString(8).padStart(3, '0');

    filePermissionsInputChar.value = permissions;
    updateCheckboxesFromInputChar(permissions);
  }

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


});
