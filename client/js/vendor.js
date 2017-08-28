/*
  This file contains references to the vendor libraries we are using in this
  project. A separate bundle for vendor code is useful since it's unlikely
  to change as often as the application code. So all libraries we reference
  here will be written to the vendor.js so they can be cached until one of
  them change. So basically, this avoids customers having to download a huge
  JS file anytime a line of code changes. They only have to download vendor.js
  when a vendor library changes which should be less frequent. Any files that
  are not referenced here will be bundled into main.js
*/

/* eslint-disable no-unused-vars */

import _ from 'lodash';
