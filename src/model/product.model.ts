import Model from "../app/model";
import BaseRepository, { oneToManyMapped } from "../plugins/mysqldb";
import { Service } from "typedi";
import { setError } from "../utils/error-format";
import moment from "moment";


export interface IProduct extends Model {
    dtype: string;
    code: string,
    name: string
}

@Service()
export class ProductRepository extends BaseRepository<IProduct>{
    constructor() {
        super("public.base_product")
    }
}

export const initProduct = {
    dtype: 'Product',
    version: 1,
    purchasable: true,
    unavailable_to_users: false,
    stock_managed: true,
    created_on: moment(Date.now()),
    updated_on: moment(Date.now()),
    auto_update_sale_price: false,
    block_expense_tax: false,
    bom_comp_valu_method_select: 2,
    check_expiration_date_at_stock_move_realization: false,
    control_on_receipt: false,
    cost_type_select: 1,
    deduct_lunch_voucher: false,
    def_ship_coef_by_partner: false,
    exclude_from_mrp: false,
    expense: false,
    has_warranty: false,
    in_ati: false,
    inventory_type_select: 0,
    is_activity: false,
    is_analytic_capture: false,
    is_model: false,
    is_perishable: false,
    is_prototype: false,
    is_shipping_costs_product: false,
    is_unrenewed: false,
    manage_variant_price: false,
    manuf_order_comp_valu_method_select: 1,
    procurement_method_select: 'buy',
    product_sub_type_select: 0,
    product_type_select: 'storable',
    real_or_estimated_price_select: 1,
    sellable: false,
    shipping_coef: '0.00',
    standard_delay: 0,
    start_date: moment(Date.now()),
    perishable_nbr_of_months: 0,
    personal_expense: false,
    created_by: '1',
    updated_by: '1',
}
