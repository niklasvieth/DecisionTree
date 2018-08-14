sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("decDecisionTree.controller.ViewTest", {
		onInit: function () {

		},
		onAfterRendering: function () {
			console.log("afterrendering");
			if (!document.getElementById("recast-webchat")) {
				var s = document.createElement("script");
				s.setAttribute("id", "recast-webchat");
				s.setAttribute("src", "https://cdn.recast.ai/webchat/webchat.js");
				document.body.appendChild(s);
			}

			//Niklas
			// s.setAttribute("channelId", "f12b1d23-45ff-4881-a37f-fec3e4f3164c");
			// s.setAttribute("token", "e80922b22a573999d50b5e29d1af1f69");

			//Praveen
			s.setAttribute("channelId", "60b86f40-1697-4281-9753-5c70d812ad41");
			s.setAttribute("token", "0b2e151170478a898e57ea2b78a675d7");

		},

		onDepartmentPress: function (oEvent) {

			// //navigate to a specific subsection on open
			// this.oObjectPageLayout = this.byId("ObjectPageLayout");
			// this.oTargetSubSection = this.byId("subsectionDetails");

			// // this.oTargetSubSection.setMode("Expanded");

			// oEvent.getSource().addEventDelegate({
			// 	ontap: function () {
			// 		//need to wait for the scrollEnablement to be active
			// 		jQuery.sap.delayedCall(500, this.oObjectPageLayout, this.oObjectPageLayout.scrollToSection, [this.oTargetSubSection.getId()]);
			// 	}.bind(this)
			// });

			// this.oTargetSubSection.addBlock(new sap.m.Text({
			// 	text: "More details will be displayed here ..."
			// }));

			// console.log( oEvent.getParameters("listItem").getBindingContext());
			this.handleQuickViewBtnPress(oEvent);
			this.openDepartmentDetails(oEvent);
		},

		onTogglePress: function (oEvent) {

			//	var oModel = this.getView().getModel();
			var togglepressed = this.getTogglePressed();
			this.setDepartmentFilter(togglepressed);
		},

		getTogglePressed: function () {
			var togglepress = '';
			for (var i = 5; i < 14; i++) {

				var tbn = "tbn_";
				tbn = tbn + i;

				if (this.byId(tbn).getPressed()) {
					togglepress += '1';
				} else {
					togglepress += '0';
				}

			}
			//console.log(togglepress);
			return togglepress;
		},

		setDepartmentFilter: function (togglepressed) {
			var oFilter = new sap.ui.model.Filter("Decision",
				sap.ui.model.FilterOperator.EQ, togglepressed);
			var oBinding = this.getView().byId("departmentList").getBinding("items");
			oBinding.filter(oFilter, "Application");
		},
		onTogglePress2: function (oEvent) {

			for (var i = 5; i < 8; i++) {
				var tbn = "tbn_";
				tbn = tbn + i;
				this.byId(tbn).setPressed(false);
			}

			this.byId(oEvent.getSource().getId()).setPressed(true);

			var btn_id = oEvent.getSource().getId();

			if (btn_id.includes("tbn_7")) {
				this.byId('grid_btn_row2').setVisible(true);

			} else {
				this.byId('grid_btn_row2').setVisible(false);
				this.byId('grid_btn_row3').setVisible(false);
			}

			this.onTogglePress();
		},

		onTogglePress3: function (oEvent) {
			var btn_id = oEvent.getSource().getId();
			if (btn_id.includes("tbn_8")) {
				this.byId("tbn_9").setPressed(false);
				this.getView().byId("grid_btn_row3").setVisible(true);
			} else if (btn_id.includes("tbn_9")) {
				this.byId("tbn_8").setPressed(false);
				this.getView().byId("grid_btn_row3").setVisible(false);
			}
			this.byId(oEvent.getSource().getId()).setPressed(true);

			this.onTogglePress();

		},

		// new methods
		onButtonPress: function (oEvent) {
			var togglepressed = this.getCombination();
			console.log(togglepressed);
			this.setDepartmentFilter1(togglepressed);
			this.getView().byId("departmentListAlsoConsider").setVisible(false);

		},
		getCombination: function () {
			var togglepress = '';
			for (var i = 1; i < 15; i++) {

				var tbn = "tbn";
				tbn = tbn + i;

				if (this.byId(tbn).getPressed()) {
					togglepress += '1';
				} else {
					togglepress += '0';
				}

			}
			//console.log(togglepress);
			return togglepress;
		},
		onBudgetPress: function (oEvent) {
			var btn_id = oEvent.getSource().getId();

			if (btn_id.includes("tbn1")) {
				this.byId("tbn2").setPressed(false);
				this.getView().byId("checkbox_c_level").setVisible(true);

				this.resetSolutions();
				this.getView().byId("grid_solutions").setVisible(true);
			} else if (btn_id.includes("tbn2")) {
				this.byId("tbn1").setPressed(false);
				this.getView().byId("checkbox_c_level").setVisible(false);

				this.resetSolutions();
				this.getView().byId("grid_solutions").setVisible(true);
			}
			oEvent.getSource().setPressed(true);
			this.onButtonPress();
		},
		onCheckBoxClick: function (oEvent) {

			if (this.getView().byId("checkbox_c_level").getSelected()) {

				this.setDepartmentFilter1('11000000000000');
			}

		},
		onSolutionPress: function (oEvent) {
			var btn_id = oEvent.getSource().getId();
			this.resetProjectLength();
			if (btn_id.includes("tbn3")) {
				this.byId("tbn4").setPressed(false);
				this.resetPressedOutcomeButtons();
				this.resetVisibleOutcomeButtons();

				if (this.getView().byId("tbn1").getPressed() === true) {
					this.getView().byId("tbn5_box").setVisible(false);
					this.getView().byId("tbn9_box").setVisible(false);
					this.getView().byId("tbn10_box").setVisible(false);
					this.getView().byId("tbn11_box").setVisible(false);

				} else if (this.getView().byId("tbn2").getPressed() === true) {
					this.getView().byId("tbn6_box").setVisible(false);
					this.getView().byId("tbn9_box").setVisible(false);
					this.getView().byId("tbn10_box").setVisible(false);
					this.getView().byId("tbn11_box").setVisible(false);

				}
			} else if (btn_id.includes("tbn4")) {
				this.byId("tbn3").setPressed(false);
				this.resetPressedOutcomeButtons();
				this.resetVisibleOutcomeButtons();

				if (this.getView().byId("tbn1").getPressed() === true) {
					this.getView().byId("tbn5_box").setVisible(false);
					this.getView().byId("tbn6_box").setVisible(false);
					this.getView().byId("tbn11_box").setVisible(false);

				} else if (this.getView().byId("tbn2").getPressed() === true) {
					this.getView().byId("tbn6_box").setVisible(false);
					this.getView().byId("tbn11_box").setVisible(false);

				}
			}
			oEvent.getSource().setPressed(true);
			this.onButtonPress();
		},
		onProjectOutcomePress: function (oEvent) {
			this.resetPressedOutcomeButtons();

			oEvent.getSource().setPressed(true);
			var btn_id = oEvent.getSource().getId();
			if (btn_id.includes("tbn7") && this.getView().byId("tbn1").getPressed() && this.getView().byId("tbn3").getPressed()) {
				this.getView().byId("grid_project_length").setVisible(true);
			} else {
				this.resetProjectLength();
			}
			this.onButtonPress();

		},
		onProjectLengthPress: function (oEvent) {
			var btn_id = oEvent.getSource().getId();

			if (btn_id.includes("tbn12")) {
				this.byId("tbn13").setPressed(false);
				this.byId("tbn14").setPressed(false);
			} else if (btn_id.includes("tbn13")) {
				this.byId("tbn12").setPressed(false);
				this.byId("tbn14").setPressed(false);
				console.log("filter setzen");
				// this.getView().byId("departmentListAlsoConsider").setVisible(true);
			} else if (btn_id.includes("tbn14")) {
				this.byId("tbn12").setPressed(false);
				this.byId("tbn13").setPressed(false);
				// this.getView().byId("departmentListAlsoConsider").setVisible(true);
			}
			oEvent.getSource().setPressed(true);
			this.onButtonPress();
			this.setAlsoConsiderFilter(this.getCombination());
		},
		// Reset functions
		resetProjectLength: function (oEvent) {
			for (var i = 12; i < 15; i++) {
				this.getView().byId("tbn" + i).setPressed(false);
			}
			this.getView().byId("grid_project_length").setVisible(false);
		},
		resetProjectOutcome: function (oEvent) {
			this.resetProjectLength();
			this.resetPressedOutcomeButtons();

		},
		resetPressedOutcomeButtons: function (oEvent) {
			for (var i = 5; i < 12; i++) {
				// this.getView().byId("tbn" + i).setVisible(true);
				this.getView().byId("tbn" + i).setPressed(false);
			}
			this.getView().byId("grid_project_outcome").setVisible(true);

		},
		resetVisibleOutcomeButtons: function (oEvent) {
			for (var i = 5; i < 12; i++) {
				this.getView().byId("tbn" + i + "_box").setVisible(true);
			}
		},
		resetSolutions: function (oEvent) {
			this.resetProjectOutcome();
			for (var i = 3; i < 5; i++) {
				this.getView().byId("tbn" + i).setPressed(false);
			}
			this.getView().byId("grid_solutions").setVisible(false);
			this.getView().byId("grid_project_outcome").setVisible(false);
		},
		setDepartmentFilter1: function (togglepressed) {

			var oFilter = new sap.ui.model.Filter("Decision",
				sap.ui.model.FilterOperator.EQ, togglepressed);
			var oBinding = this.getView().byId("departmentList").getBinding("items");
			oBinding.filter(oFilter, "Application");
		},

		setAlsoConsiderFilter: function (togglepressed) {
			this.getView().byId("departmentListAlsoConsider").setVisible(true);
			var oFilter = new sap.ui.model.Filter('Decision',
				sap.ui.model.FilterOperator.EQ, togglepressed);

			console.log(togglepressed + "filter also");
			var oBinding = this.getView().byId("departmentListAlsoConsider").getBinding("items");
			oBinding.filter(oFilter, "Application");

		},

		/**********Department Details **********/

		openDepartmentDetails: function (oEvent) {

			var oPath = oEvent.getSource().getBindingContext("department_model").getPath();
			console.log(oPath);
			oPath = "{department_model>" + oPath;
			console.log(oPath);

			var item = oEvent.getSource().getBindingContext('department_model').getObject();

			var oModel = new JSONModel(item);
			sap.ui.getCore().setModel(oModel, "detailItem");
			// view.getModel('detailItem').setData(item);
			console.log(this.getView().getModel('detailItem'));

			this._pressDialog = sap.ui.xmlfragment("decDecisionTree.fragment.DepartmentPopup", this);
			// new sap.m.Dialog({
			// 	title: "Department Details",
			// 	content: new sap.m.Text().bindText("{department_model>/DepartmentsSet('VPP')/DepartmentName}"),

			// 	beginButton: new sap.m.Button({
			// 		text: 'Close',
			// 		press: function () {
			// 			this._pressDialog.close();

			// 		}.bind(this)
			// 	})
			// });
			this._pressDialog.open();

		},

		/**********Project Details**********/

		onExit: function () {
			if (this._oQuickView) {
				this._oQuickView.destroy();
			}
			if (this._oPopup) {
				this._oPopup.destroy();
			}
			if (this._pressDialog) {
				this._pressDialog.destroy();
			}
		},
		saveProject: function (oEvent) {

			var oModel = this.getOwnerComponent().getModel("department_model");
			console.log(sap.ui.getCore().byId("departmentSelect").getSelectedKey());

			// create an entry of the Products collection with the specified properties and values
			var oContext = oModel.createEntry("/ProjectSet", {
				properties: {
					ProjectName: sap.ui.getCore().byId("projectNameInput").getValue(),
					ProjectDescription: sap.ui.getCore().byId("descriptionInput").getValue(),
					// TelNumber: '+123456789',
					// EMail: 'c.butzlaff@sap.com',
					// ResponsiblePerson: 'Christian Butzlaff',
					DepartmentId: sap.ui.getCore().byId("departmentSelect").getSelectedKey()
				}
			});
			// 	// binding against this entity
			//oForm.setBindingContext(oContext);
			// 	// submit the changes (creates entity at the backend)
			oModel.submitChanges({

			});
			// delete the created entity
			// 	oModel.deleteCreatedEntry(oContext);

			// 	*/
			this.onExit();
		},
		onAddEntryPress: function (oEvent) {

			if (!this._oDialog) {
				this._oPopup = sap.ui.xmlfragment("decDecisionTree.fragment.ProjectPopup", this);

				this.getView().addDependent(this._oPopup);
			}

			this._oPopup.open();
		},

		/**********QuickView**********/

		openQuickView: function (oEvent, oModel) {

			this.oModel = new JSONModel();

			// this.oModel.setData("{department_model/DepartmentSet}");
			var oPath = oEvent.getSource().getBindingContext("department_model").getPath();
			this.createPopover(oPath);

			// delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
			var oButton = oEvent.getSource();
			jQuery.sap.delayedCall(0, this, function () {
				this._oQuickView.openBy(oButton);
			});

			// oContect =  oEvent.getParameter("listItem").getBindingContext();

		},

		handleQuickViewBtnPress: function (oEvent) {
			this.openQuickView(oEvent, this.oModel);
		},

		createPopover: function (oPath) {
			oPath = "{department_model>" + oPath;
			if (!this._oQuickView) {
				// this._oQuickView = sap.ui.xmlfragment("decDecisionTree.fragment.QuickView", this);
				this._oQuickView = new sap.m.QuickView({
					placement: sap.m.PlacementType.Left
				});
				this._oQuickView.addPage(new sap.m.QuickViewPage({
					header: oPath + "/DepartmentName}",
					icon: oPath + "/ImageUrl}",
					title: oPath + "/ResponsiblePerson}",
					// titleUrl= "",
					description: oPath + "/ShortDescription}"

				}));

				this.getView().addDependent(this._oQuickView);
			}

		},

		// onNavigate: function (oEvent) {
		// 	var oNavOrigin = oEvent.getParameter("navOrigin");
		// 	if (oNavOrigin) {
		// 		this.mData.pages.splice(1, 1, this.employeeData[oNavOrigin.getText()]);
		// 		this.oModel.setData(this.mData);
		// 	}
		// },

	});

});