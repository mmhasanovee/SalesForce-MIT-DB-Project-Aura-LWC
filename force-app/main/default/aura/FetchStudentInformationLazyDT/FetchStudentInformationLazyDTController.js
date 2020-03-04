({
    doInit: function (component, event, helper) {
        var action = component.get('c.fetchAccount');
        $A.enqueueAction(action, false);
        action.setCallback(this, function (response) {
            var responseValue = response.getReturnValue();
            console.log('responseValue', responseValue);
            component.set('v.studentList', responseValue);
        }, 'SUCCESS');
    },

    onCheck: function (component, event, helper) {
        var re = component.get('v.idToDelete');
        var whichOne = event.getSource();
        var buttonId = whichOne.get('v.name');

        if (re.includes(buttonId)) {

            for (var i = 0; i < re.length; i++) {
                if (re[i] === buttonId) {
                    re.splice(i, 1);
                }
            }


        }
        else {
            re.push(buttonId);
            component.set('v.idToDelete', re);
        }
        var result = component.get('v.idToDelete');
        console.log('v.idToDelete', result);


    },

    doDelete: function (component, event, helper) {

        var idsToDelete = component.get('v.idToDelete');

        if (idsToDelete == '') {
            alert("Please select an entity first, don't be stupid");
        }
        else {
            console.log(idsToDelete);
            var action = component.get('c.batchDeleteRecordFromCustomTableCmp');
            action.setParams({
                listOfIds: idsToDelete //passing the id as string parameter to the class you got.
            });

            action.setCallback(this, function (response) {
                var state = response.getState();
                if (state === 'SUCCESS') {
                    console.log('Success');
                    location.reload();


                } else {
                    console.log(response.getError());
                }

            });

            $A.enqueueAction(action);
        }
    },

    profileView: function (component, event, helper) {

        // var val = event.target.value;
        // console.log('val is ', val);

        // var pageReference = component.find("navigation"); //finding component via 
        // var pageReferenceNav = {
        //     "type": "standard__component",
        //     "attributes": {
        //         "componentName": "c__StudentProfileHolderModal"
        //     },
        //     "state": {
        //         "c__profileId": val
        //     }
        // };
        // pageReference.navigate(pageReferenceNav);

        var modalBody;

        var x = event.target.value;
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


    onScrollX: function (component, event, helper) {

        // console.log('scrolling');
        var elmnt = document.getElementById("customers");
        var position = elmnt.scrollTop;
        var totalHeight = elmnt.scrollHeight;
        // console.log('total height', totalHeight);
        // console.log('position', position);

        var lol = totalHeight - position;
        console.log('Total height is', lol);

        if (totalHeight - position <= 300) {
            var isLoading = component.get("v.isLoading");
            if (!isLoading) {
                component.set("v.isLoading", true);
                var offset = component.get('v.dataOffset');
                offset += 5;
                component.set('v.dataOffset', offset);
                //alert(offset);
                //event.getSource().set("v.isLoading", true);

                var action = component.get('c.getAccountList');
                action.setParams({
                    dLimit: 5,
                    dOffset: offset
                });
                action.setCallback(this, function (response) {
                    var responseValue = response.getReturnValue();
                    //console.log('querydata',responseValue);
                    //component.set('v.data',responseValue);
                    var data = component.get('v.studentList');
                    var newData = data.concat(responseValue);
                    component.set('v.studentList', newData);
                    component.set("v.isLoading", false);
                    //event.getSource().set("v.isLoading", false);
                });
                $A.enqueueAction(action, false);
            }
        }
    }



})