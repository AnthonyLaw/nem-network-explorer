"use strict";
/*
 * Copyright 2018 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const UInt64_1 = require("../UInt64");
/**
 * Mosaic properties model
 */
class MosaicProperties {
    /**
     * @param flags
     * @param divisibility
     * @param duration
     */
    constructor(flags, 
    /**
     * The divisibility determines up to what decimal place the mosaic can be divided into.
     * Thus a divisibility of 3 means that a mosaic can be divided into smallest parts of 0.001 mosaics
     * i.e. milli mosaics is the smallest sub-unit.
     * When transferring mosaics via a transfer transaction the quantity transferred
     * is given in multiples of those smallest parts.
     * The divisibility must be in the range of 0 and 6. The default value is "0".
     */
    divisibility, 
    /**
     * The duration in blocks a mosaic will be available.
     * After the duration finishes mosaic is inactive and can be renewed.
     */
    duration) {
        this.divisibility = divisibility;
        this.duration = duration;
        let binaryFlags = '00' + (flags.lower >>> 0).toString(2);
        binaryFlags = binaryFlags.substr(binaryFlags.length - 3, 3);
        this.supplyMutable = binaryFlags[2] === '1';
        this.transferable = binaryFlags[1] === '1';
        this.levyMutable = binaryFlags[0] === '1';
    }
    /**
     * Static constructor function with default parameters
     * @returns {MosaicProperties}
     * @param params
     */
    static create(params) {
        const flags = (params.supplyMutable ? 1 : 0) + (params.transferable ? 2 : 0) + (params.levyMutable ? 4 : 0);
        return new MosaicProperties(UInt64_1.UInt64.fromUint(flags), params.divisibility, params.duration);
    }
}
exports.MosaicProperties = MosaicProperties;
//# sourceMappingURL=MosaicProperties.js.map