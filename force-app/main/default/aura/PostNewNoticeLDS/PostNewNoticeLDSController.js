({
    recordSaved: function (component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been created successfully."
        });
        toastEvent.fire();

        $A.get("e.force:refreshView").fire();
    }
})