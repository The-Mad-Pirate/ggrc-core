/*
 Copyright (C) 2018 Google Inc.
 Licensed under http://www.apache.org/licenses/LICENSE-2.0 <see LICENSE file>
 */

import Component from '../related-revisions-item';
import {getComponentVM} from '../../../../../js_specs/spec_helpers';

describe('RelatedRevisionsItem component', () => {
  let viewModel;

  beforeEach(() => {
    viewModel = getComponentVM(Component);
  });

  describe('isCreated value getter', () => {
    beforeEach(() => {
      viewModel.attr('revision', new can.Map({action: null}));
    });

    it('returns true when revision.action value is "created"', () => {
      viewModel.attr('revision.action', 'created');

      expect(viewModel.attr('isCreated')).toBe(true);
    });

    it('returns false when revision.action value is not "created"', () => {
      viewModel.attr('revision.action', null);

      expect(viewModel.attr('isCreated')).toBe(false);
    });
  });

  describe('revision value setter', () => {
    let getPersonInfoDfd;

    beforeEach(() => {
      getPersonInfoDfd = can.Deferred();
      spyOn(GGRC.Utils, 'getPersonInfo').and.returnValue(getPersonInfoDfd);
    });

    it('sets modifiedBy attr correctly ' +
      'after getPersonInfo() success', (done) => {
      viewModel.attr('revision', {modified_by: 'user'});

      getPersonInfoDfd.then(() => {
        expect(viewModel.attr('modifiedBy')).toBe('person');
        done();
      });

      getPersonInfoDfd.resolve('person');
    });

    it('do not call getPersonInfo() method when passed value is empty', () => {
      viewModel.attr('revision', null);
      expect(GGRC.Utils.getPersonInfo).not.toHaveBeenCalled();
    });
  });
});
