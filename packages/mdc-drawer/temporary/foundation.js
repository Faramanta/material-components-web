/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {MDCMovableDrawerFoundation} from '../movable';
import {cssClasses, strings} from './constants';

export default class MDCTemporaryDrawerFoundation extends MDCMovableDrawerFoundation {
  static get cssClasses() {
    return cssClasses;
  }

  static get strings() {
    return strings;
  }

  static get defaultAdapter() { 
    let defaultAdapter = MDCMovableDrawerFoundation.defaultAdapter;
    defaultAdapter.updateCssVariable = (/* value: string */) => {};
    return defaultAdapter;
  }

  constructor(adapter) {
    super(Object.assign(MDCTemporaryDrawerFoundation.defaultAdapter, adapter));

    this.componentClickHandler_ = () => this.close();
  }

  get rootCssClass() {
    return MDCTemporaryDrawerFoundation.cssClasses.ROOT;
  }

  get animatingCssClass() {
    return MDCTemporaryDrawerFoundation.cssClasses.ANIMATING;
  }

  get openCssClass() {
    return MDCTemporaryDrawerFoundation.cssClasses.OPEN;
  }

  init() {
    super.init();
     
    // Make browser aware of custom property being used in this element.   
    // Workaround for certain types of hard-to-reproduce heisenbugs.    
    this.adapter_.updateCssVariable(0);
    this.adapter_.registerInteractionHandler('click', this.componentClickHandler_);
  }

  destroy() {
    super.destroy();

    this.adapter_.deregisterInteractionHandler('click', this.componentClickHandler_);
  }

  open() {
    // Make sure custom property values are cleared before starting.    
    this.adapter_.updateCssVariable('');

    super.open();
  }

  close() {
    // Make sure custom property values are cleared before making any changes.    
    this.adapter_.updateCssVariable('');

    super.close();
  }


  prepareForTouchEnd() {
    super.prepareForTouchEnd();

    this.adapter_.updateCssVariable('');
  }

  updateDrawer_() {
    super.updateDrawer_();

    let newOpacity = Math.max(0, 1 + this.direction_ * (this.newPos / this.drawerWidth_));
    this.adapter_.updateCssVariable(newOpacity);
  }
}
