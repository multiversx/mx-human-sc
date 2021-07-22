#[test]
fn _1_deploy_init_go() {
    elrond_wasm_debug::mandos_go("mandos/1-deploy.scen.json");
}

#[test]
fn _2_create_job_go() {
    elrond_wasm_debug::mandos_go("mandos/2-create-job.scen.json");
}

#[test]
fn _3_setup_go() {
    elrond_wasm_debug::mandos_go("mandos/3-setup.scen.json");
}

#[test]
fn _4_store_intermediate_go() {
    elrond_wasm_debug::mandos_go("mandos/4-store-intermediate.scen.json");
}

#[test]
fn _5a_full_pay_out_go() {
    elrond_wasm_debug::mandos_go("mandos/5a-full-pay-out.scen.json");
}

#[test]
fn _5b_partial_pay_out_go() {
    elrond_wasm_debug::mandos_go("mandos/5b-partial-pay-out.scen.json");
}

#[test]
fn _6a_complete_go() {
    elrond_wasm_debug::mandos_go("mandos/6a-complete.scen.json");
}

#[test]
fn _6b_cancel_go() {
    elrond_wasm_debug::mandos_go("mandos/6b-cancel.scen.json");
}

#[test]
fn _6c_abort_go() {
    elrond_wasm_debug::mandos_go("mandos/6c-abort.scen.json");
}
