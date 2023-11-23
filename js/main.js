
document.addEventListener('DOMContentLoaded', function () {
    // Event listeners here
    //user
    const userReadCheckbox = document.getElementById('userReadCheckbox');
    const userWriteCheckbox = document.getElementById('userWriteCheckbox');
    const userExecuteCheckbox = document.getElementById('userExecuteCheckbox');
    //group
    const groupReadCheckbox = document.getElementById('groupReadCheckbox');
    const groupWriteCheckbox = document.getElementById('groupWriteCheckbox');
    const groupExecuteCheckbox = document.getElementById('groupExecuteCheckbox');
    //other
    const otherReadCheckbox = document.getElementById('otherReadCheckbox');
    const otherWriteCheckbox = document.getElementById('otherWriteCheckbox');
    const otherExecuteCheckbox = document.getElementById('otherExecuteCheckbox');
    //
    const calculateButton = document.getElementById('calculateButton');
    const resultOutput = document.getElementById('resultOutput');

    calculateButton.addEventListener('click', calculatePermissions)

    function calculatePermissions() {
        const userPermissions = getUserPermissions();
        const groupPermissions = getGroupPermissions();
        const othersPermissions = getOthersPermissions();

        const result = `${userPermissions}${groupPermissions}${othersPermissions}`;
        resultOutput.textContent = `${result}`;
    }

    // User permissions
    function getUserPermissions(){
        return getPermissions(userReadCheckbox, userWriteCheckbox, userExecuteCheckbox);
    }

    // Group Permissions
    function getGroupPermissions(){
        return getPermissions(groupReadCheckbox, groupWriteCheckbox, groupExecuteCheckbox);
    }

    // Other Permissions
    function getOthersPermissions(){
        return getPermissions(otherReadCheckbox, otherWriteCheckbox, otherExecuteCheckbox);
    }
    
    function getPermissions(readCheckbox, writeCheckbox, executeCheckbox){

        const readPermission = readCheckbox.checked ? 'r' : '-';
        const writePermission = writeCheckbox.checked ? 'w' : '-';
        const executePermission = executeCheckbox.checked ? 'x' : '-';

        return `${readPermission}${writePermission}${executePermission}`;
    }
});