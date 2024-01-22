/** @odoo-module */

import { registry } from '@web/core/registry';

import { kanbanView } from "@web/views/kanban/kanban_view";
import { KanbanController } from "@web/views/kanban/kanban_controller";
import { useService } from "@web/core/utils/hooks";

const { onWillStart } = owl;

class ResPartnerKanbanController extends KanbanController {
    setup(){
        super.setup();
        this.action = useService("action");
        this.orm = useService("orm");

        onWillStart(async () => {
            this.customerLocations = await this.orm.readGroup("res.partner", [], ["state_id"], ["state_id"])
            console.log(">>>>>>>>", this.customerLocations)
        })
    }

    openInvoiceView(){
        this.action.doAction({
            type: "ir.actions.act_window",
            name: "Customer Invoices",
            res_model: "account.move",
            views: [[false,'list'],[false,'form']]
        });
    }

// for version 16.0
//    selectLocation(state){
//        const id = state[0];
//        const name = state[1];
//
//        this.env.searchModel.setDomainParts({
//            state: {
//                domain: [['state_id', '=', id]],
//                facetLabel: name
//            }
//        })
//    }

// For 17.0
    selectLocation(state_id, state_name) {
        const customerFilters = this.env.searchModel.getSearchItems((searchItem) =>
            searchItem[this.searchKey]
        );
        for (const customerFilter of customerFilters) {
            if (customerFilter.isActive) {
                this.env.searchModel.toggleSearchItem(customerFilter.id);
            }
        }
        this.env.searchModel.createNewFilters([{
            description: state_name,
            domain: [["state_id", "=", state_id]],
            [this.searchKey]: true,
        }])
    }
}

ResPartnerKanbanController.template = 'owl.ResPartnerKanbanView';

export const resPartnerKanbanController = {
    ...kanbanView,
    Controller: ResPartnerKanbanController,
    buttonTemplate: 'owl.ResPartnerKanbanView.Buttons',
}

registry.category("views").add("res_partner_kanban_view", resPartnerKanbanController)