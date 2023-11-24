document.addEventListener('DOMContentLoaded', function () {
    // Event listeners here
  
    // User checkboxes
    const userReadCheckbox = document.getElementById('userReadCheckbox');
    const userWriteCheckbox = document.getElementById('userWriteCheckbox');
    const userExecuteCheckbox = document.getElementById('userExecuteCheckbox');
  
    // Group checkboxes
    const groupReadCheckbox = document.getElementById('groupReadCheckbox');
    const groupWriteCheckbox = document.getElementById('groupWriteCheckbox');
    const groupExecuteCheckbox = document.getElementById('groupExecuteCheckbox');
  
    // Other checkboxes
    const otherReadCheckbox = document.getElementById('otherReadCheckbox');
    const otherWriteCheckbox = document.getElementById('otherWriteCheckbox');
    const otherExecuteCheckbox = document.getElementById('otherExecuteCheckbox');
  
    // File permissions input
    const filePermissionsInput = document.getElementById('filePermissionsInput');
  
    // Input listener to textbox
    filePermissionsInput.addEventListener('input', updateCheckboxesFromInput);
    filePermissionsInput.addEventListener('keyup', updateCheckboxesFromInput); // Added this line to handle keyup events
  
    function updateCheckboxesFromInput() {
      const inputPermissions = filePermissionsInput.value;
      updateCheckboxes(inputPermissions);
    }
  
    function updateInputFromCheckboxes() {
      const userPermissions = getUserPermissions();
      const groupPermissions = getGroupPermissions();
      const othersPermissions = getOthersPermissions();
  
      const result = `${userPermissions}${groupPermissions}${othersPermissions}`;
      filePermissionsInput.value = result;
    }
  
    // Update checkboxes based on input value
    function updateCheckboxes(inputPermissions) {
      const userPermissions = inputPermissions.slice(0, 3);
      const groupPermissions = inputPermissions.slice(3, 6);
      const othersPermissions = inputPermissions.slice(6, 9);
  
      updateUserCheckboxes(userPermissions);
      updateGroupCheckboxes(groupPermissions);
      updateOthersCheckboxes(othersPermissions);
    }
  
    // Update user checkboxes
    function updateUserCheckboxes(userPermissions) {
      userReadCheckbox.checked = userPermissions[0] === 'r';
      userWriteCheckbox.checked = userPermissions[1] === 'w';
      userExecuteCheckbox.checked = userPermissions[2] === 'x';
    }
  
    // Update group checkboxes
    function updateGroupCheckboxes(groupPermissions) {
      groupReadCheckbox.checked = groupPermissions[0] === 'r';
      groupWriteCheckbox.checked = groupPermissions[1] === 'w';
      groupExecuteCheckbox.checked = groupPermissions[2] === 'x';
    }
  
    // Update other checkboxes
    function updateOthersCheckboxes(othersPermissions) {
      otherReadCheckbox.checked = othersPermissions[0] === 'r';
      otherWriteCheckbox.checked = othersPermissions[1] === 'w';
      otherExecuteCheckbox.checked = othersPermissions[2] === 'x';
    }
  
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('click', updateInputFromCheckboxes);
    });
  
    // User permissions
    function getUserPermissions() {
      return getPermissions(userReadCheckbox, userWriteCheckbox, userExecuteCheckbox);
    }
  
    // Group Permissions
    function getGroupPermissions() {
      return getPermissions(groupReadCheckbox, groupWriteCheckbox, groupExecuteCheckbox);
    }
  
    // Other Permissions
    function getOthersPermissions() {
      return getPermissions(otherReadCheckbox, otherWriteCheckbox, otherExecuteCheckbox);
    }
  
    function getPermissions(readCheckbox, writeCheckbox, executeCheckbox) {
      const readPermission = readCheckbox.checked ? 'r' : '-';
      const writePermission = writeCheckbox.checked ? 'w' : '-';
      const executePermission = executeCheckbox.checked ? 'x' : '-';
  
      return `${readPermission}${writePermission}${executePermission}`;
    }
  });
  