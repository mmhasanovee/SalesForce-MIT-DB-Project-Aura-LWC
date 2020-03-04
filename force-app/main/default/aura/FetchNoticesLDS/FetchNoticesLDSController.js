({
    doInit: function (component, event, helper) {
        var action = component.get('c.fetchNotices');
        $A.enqueueAction(action, false);
        action.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log('responseValue', responseValue);
            component.set('v.noticeList', responseValue);
        }, 'SUCCESS');

    },

    doEdit: function (component, event, helper) {
        var Val = event.target.value; //get the value of the custom button
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": Val
        });
        editRecordEvent.fire();
    },

    doDelete: function (component, event, helper, objButton) {

        var Val = event.target.value;
        console.log(Val);
        if (confirm('Are you sure you want to delete the notice?')) {


            var action = component.get('c.delNotice'); //getting the method from PlaneListXController
            action.setParams({
                idToDelete: Val //passing the id as string parameter to the class you got.
            });
            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": "Success!",
                        "message": "The record has been deleted successfully."
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
                } else {
                    console.log(response.getError());
                }

            });

            $A.enqueueAction(action);


        } else {
            console.log('Dialog has been cancellled');
        }

    }

})