
document.addEventListener('DOMContentLoaded', function () {
    // Event listeners here
    const readCheckbox = document.getElementById('readCheckbox');
    const writeCheckbox = document.getElementById('writeCheckbox');
    const executeCheckbox = document.getElementById('executeCheckbox');
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

    function getUserPermissions(){
        return getPermissions(readCheckbox, writeCheckbox, executeCheckbox);
    }

    // Update once new checkboxes are added
    function getGroupPermissions(){
        // Returns string such as 'r--' for group's permissions
        return '';
    }

    function getOthersPermissions(){
        // Returns string such as 'r--' for other's permissions
        return '';
    }
    
    function getPermissions(readCheckbox, writeCheckbox, executeCheckbox){

        // Update once more checkboxes are added

        const readPermission = readCheckbox.checked ? 'r' : '-';
        const writePermission = writeCheckbox.checked ? 'w' : '-';
        const executePermission = executeCheckbox.checked ? 'x' : '-';

        return `${readPermission}${writePermission}${executePermission}`;
    }
});