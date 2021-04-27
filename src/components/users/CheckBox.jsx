
import React from "react";

const CheckBox = () => {
    return (
        <div class="widget-content widget-content-area">
            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Default
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-primary">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Primary
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-success">
                    <input type="checkbox" class="new-control-input" checked="" />
                    <span class="new-control-indicator"></span>Success
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-info">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Info
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-warning">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Warning
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-danger">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Danger
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-secondary">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Secondary
                </label>
            </div>

            <div class="n-chk">
                <label class="new-control new-checkbox new-checkbox-rounded checkbox-dark">
                    <input type="checkbox" class="new-control-input" />
                    <span class="new-control-indicator"></span>Dark
                </label>
            </div>
        </div>
    );
};

export default CheckBox;