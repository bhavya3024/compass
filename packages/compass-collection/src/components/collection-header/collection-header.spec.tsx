import AppRegistry from 'hadron-app-registry';
import { expect } from 'chai';
import type { ComponentProps } from 'react';
import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { spy } from 'sinon';
import userEvent from '@testing-library/user-event';

import CollectionHeader from '../collection-header';
import { getCollectionStatsInitialState } from '../../modules/stats';

function renderCollectionHeader(
  props: Partial<ComponentProps<typeof CollectionHeader>>
) {
  return render(
    <CollectionHeader
      isAtlas={false}
      isReadonly={false}
      isTimeSeries={false}
      isClustered={false}
      isFLE={false}
      globalAppRegistry={new AppRegistry()}
      namespace="test.test"
      selectOrCreateTab={() => {}}
      pipeline={[]}
      stats={getCollectionStatsInitialState()}
      {...props}
    />
  );
}

describe('CollectionHeader [Component]', function () {
  afterEach(cleanup);

  context('when the collection is not readonly', function () {
    const globalAppRegistry = new AppRegistry();
    const selectOrCreateTabSpy = spy();

    beforeEach(function () {
      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={false}
          isTimeSeries={false}
          isClustered={false}
          isFLE={false}
          globalAppRegistry={globalAppRegistry}
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );
    });

    it('renders the correct root classname', function () {
      expect(screen.getByTestId('collection-header')).to.exist;
    });

    it('renders the db name', function () {
      expect(screen.getByTestId('collection-header-title-db')).to.exist;
    });

    it('renders the collection name', function () {
      expect(screen.getByTestId('collection-header-title-collection')).to.exist;
    });

    it('does not render the readonly badge', function () {
      expect(screen.queryByTestId('collection-badge-readonly')).to.not.exist;
    });

    it('does not render the time series badge', function () {
      expect(screen.queryByTestId('collection-badge-timeseries')).to.not.exist;
    });

    it('does not render the view badge', function () {
      expect(screen.queryByTestId('collection-badge-view')).to.not.exist;
    });

    it('renders the collection header actions', function () {
      expect(screen.getByTestId('collection-header-actions')).to.exist;
    });
  });

  context('when the collection is readonly', function () {
    const globalAppRegistry = new AppRegistry();
    const selectOrCreateTabSpy = spy();

    beforeEach(function () {
      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={true}
          isTimeSeries={false}
          isClustered={false}
          isFLE={false}
          sourceName="orig.coll"
          globalAppRegistry={globalAppRegistry}
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );
    });

    afterEach(cleanup);

    it('renders the correct root classname', function () {
      expect(screen.getByTestId('collection-header')).to.exist;
    });

    it('renders the db name', function () {
      expect(screen.getByTestId('collection-header-title-db')).to.exist;
    });

    it('renders the collection name', function () {
      expect(screen.getByTestId('collection-header-title-collection')).to.exist;
    });

    it('renders the source collection', function () {
      const label = screen.getByTestId('collection-view-on');
      expect(label).to.have.text('view on: orig.coll');
      expect(label).to.be.visible;
    });

    it('renders the readonly badge', function () {
      expect(screen.getByTestId('collection-badge-readonly')).to.exist;
    });

    it('renders the view badge', function () {
      expect(screen.getByTestId('collection-badge-view')).to.exist;
    });
  });

  context('when the collection is readonly but not a view', function () {
    const globalAppRegistry = new AppRegistry();
    const selectOrCreateTabSpy = spy();

    beforeEach(function () {
      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={true}
          isTimeSeries={false}
          isClustered={false}
          isFLE={false}
          globalAppRegistry={globalAppRegistry}
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );
    });

    it('does not render the source collection', function () {
      expect(screen.queryByTestId('collection-view-on')).to.not.exist;
    });

    it('renders the readonly badge', function () {
      expect(screen.getByTestId('collection-badge-readonly')).to.exist;
    });

    it('does not render the view badge', function () {
      expect(screen.queryByTestId('collection-badge-view')).to.not.exist;
    });
  });

  context('when the collection is a time-series collection', function () {
    const globalAppRegistry = new AppRegistry();
    const selectOrCreateTabSpy = spy();

    beforeEach(function () {
      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={false}
          isTimeSeries={true}
          isClustered={false}
          isFLE={false}
          globalAppRegistry={globalAppRegistry}
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );
    });

    it('does not render the source collection', function () {
      expect(screen.queryByTestId('collection-view-on')).to.not.exist;
    });

    it('does not render the readonly badge', function () {
      expect(screen.queryByTestId('collection-badge-readonly')).to.not.exist;
    });

    it('renders the time-series badge', function () {
      expect(screen.getByTestId('collection-badge-timeseries')).to.exist;
    });
  });

  context('when the collection is a clustered collection', function () {
    const globalAppRegistry = new AppRegistry();
    const selectOrCreateTabSpy = spy();

    beforeEach(function () {
      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={false}
          isTimeSeries={false}
          isClustered={true}
          isFLE={false}
          globalAppRegistry={globalAppRegistry}
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );
    });

    it('does not render the source collection', function () {
      expect(screen.queryByTestId('collection-view-on')).to.not.exist;
    });

    it('does not render the readonly badge', function () {
      expect(screen.queryByTestId('collection-badge-readonly')).to.not.exist;
    });

    it('does not render the time-series badge', function () {
      expect(screen.queryByTestId('collection-badge-timeseries')).to.not.exist;
    });

    it('renders the clustered badge', function () {
      expect(screen.getByTestId('collection-badge-clustered')).to.exist;
    });
  });

  context('when the collection is a fle collection', function () {
    const globalAppRegistry = new AppRegistry();
    const selectOrCreateTabSpy = spy();

    beforeEach(function () {
      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={false}
          isTimeSeries={false}
          isClustered={false}
          isFLE={true}
          globalAppRegistry={globalAppRegistry}
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );
    });

    it('renders the clustered badge', function () {
      expect(screen.getByTestId('collection-header-badge-fle2')).to.exist;
    });
  });

  context('when the db name is clicked', function () {
    it('emits the open event to the app registry', function () {
      const selectOrCreateTabSpy = spy();

      let emmittedEventName;
      let emmittedDbName;

      render(
        <CollectionHeader
          isAtlas={false}
          isReadonly={false}
          isTimeSeries={false}
          isClustered={false}
          isFLE={false}
          globalAppRegistry={
            {
              emit: (eventName, dbName) => {
                emmittedEventName = eventName;
                emmittedDbName = dbName;
              },
            } as AppRegistry
          }
          sourceName="orig.coll"
          namespace="db.coll"
          selectOrCreateTab={selectOrCreateTabSpy}
          sourceReadonly={false}
          pipeline={[]}
          stats={getCollectionStatsInitialState()}
        />
      );

      const link = screen.getByTestId('collection-header-title-db');
      expect(link).to.exist;
      userEvent.click(link);
      expect(emmittedEventName).to.equal('select-database');
      expect(emmittedDbName).to.equal('db');
    });
  });

  describe('insights', function () {
    it('should show an insight when $text is used in the pipeline source', function () {
      renderCollectionHeader({
        showInsights: true,
        pipeline: [{ $match: { $text: {} } }],
      });
      expect(screen.getByTestId('insight-badge-button')).to.exist;
      userEvent.click(screen.getByTestId('insight-badge-button'));
      expect(screen.getByText('Alternate text search options available')).to
        .exist;
    });

    it('should show an insight when $regex is used in the pipeline source', function () {
      renderCollectionHeader({
        showInsights: true,
        pipeline: [{ $match: { $regex: {} } }],
      });
      expect(screen.getByTestId('insight-badge-button')).to.exist;
      userEvent.click(screen.getByTestId('insight-badge-button'));
      expect(screen.getByText('Alternate text search options available')).to
        .exist;
    });

    it('should show an insight when $lookup is used in the pipeline source', function () {
      renderCollectionHeader({
        showInsights: true,
        pipeline: [{ $lookup: {} }],
      });
      expect(screen.getByTestId('insight-badge-button')).to.exist;
      userEvent.click(screen.getByTestId('insight-badge-button'));
      expect(screen.getByText('$lookup usage')).to.exist;
    });
  });
});
