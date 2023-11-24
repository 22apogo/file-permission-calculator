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
  
    // Checkboxes update input
    userReadCheckbox.addEventListener('change', updateInputFromCheckboxes);
    userWriteCheckbox.addEventListener('change', updateInputFromCheckboxes);
    userExecuteCheckbox.addEventListener('change', updateInputFromCheckboxes);
  
    groupReadCheckbox.addEventListener('change', updateInputFromCheckboxes);
    groupWriteCheckbox.addEventListener('change', updateInputFromCheckboxes);
    groupExecuteCheckbox.addEventListener('change', updateInputFromCheckboxes);
  
    otherReadCheckbox.addEventListener('change', updateInputFromCheckboxes);
    otherWriteCheckbox.addEventListener('change', updateInputFromCheckboxes);
    otherExecuteCheckbox.addEventListener('change', updateInputFromCheckboxes);
  
    function updateInputFromCheckboxes() {
      const userPermissions = getUserPermissions();
      const groupPermissions = getGroupPermissions();
      const othersPermissions = getOthersPermissions();
  
      const result = `${userPermissions}${groupPermissions}${othersPermissions}`;
      filePermissionsInput.value = result;
    }
  
    function updateCheckboxesFromInput() {
      const inputPermissions = filePermissionsInput.value;
      updateCheckboxes(inputPermissions);
    }
  
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
  