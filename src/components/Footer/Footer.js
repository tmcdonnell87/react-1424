/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import cx from 'classnames';
// import Link from '../Link';

function Footer() {
  return (
    <div className={s.root}>
      <div className={cx(s.container, s.sticky)}>
        <span className={s.text}>© Terry McDonnell</span>
      </div>
    </div>
  );
}

export default withStyles(s)(Footer);
