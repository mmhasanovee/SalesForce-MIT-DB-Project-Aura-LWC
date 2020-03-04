({
    handleShowModal: function (component, evt, helper) {
        var modalBody;

        var x = component.get('v.profileId');
        $A.createComponent("c:StudentProfileView", {},
            function (content, status) {
                if (status === "SUCCESS") {
                    modalBody = content;
                    component.find('overlayLib').showCustomModal({
                        header: x,
                        body: modalBody,
                        showCloseButton: true,
                        cssClass: "mymodal",

                    })
                }
            });
    },

    doInit: function (component, event, helper) {
        var pageRef = component.get('v.pageReference');
        if (pageRef) {
            var state = pageRef.state;
            component.set('v.profileId', state.c__profileId); //getting the value from the previous page and setting it to the attribute of the main cmp
            // component.find('recordViewer').reloadRecord(); //after setting the value we have to reload the recordData in order to detect the changes


        }
    }
})