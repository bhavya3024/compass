/* eslint-disable react/prop-types */
import React from 'react';
import { spacing } from '@mongodb-js/compass-components';
import { compactBytes, compactNumber } from './format';
import { NamespaceItemCard } from './namespace-card';
import { ItemsGrid } from './items-grid';

type Database = {
  _id: string;
  name: string;
  status: 'initial' | 'fetching' | 'refreshing' | 'ready' | 'error';
  storage_size: number;
  data_size: number;
  index_count: number;
  collectionsLength: number;
};

const DATABASE_CARD_WIDTH = spacing[6] * 4;

const DATABASE_CARD_HEIGHT = 154;

const DATABASE_CARD_LIST_HEIGHT = 118;

const DatabasesList: React.FunctionComponent<{
  isEditable: boolean;
  databases: Database[];
  onDatabaseClick(id: string): void;
  onDeleteDatabaseClick?: (id: string) => void;
  onCreateDatabaseClick?: () => void;
  onRefreshClick?: () => void;
}> = ({
  isEditable,
  databases,
  onDatabaseClick,
  onCreateDatabaseClick,
  onDeleteDatabaseClick,
  onRefreshClick,
}) => {
  return (
    <ItemsGrid
      isEditable={isEditable}
      items={databases}
      itemType="database"
      itemGridWidth={DATABASE_CARD_WIDTH}
      itemGridHeight={DATABASE_CARD_HEIGHT}
      itemListHeight={DATABASE_CARD_LIST_HEIGHT}
      sortBy={[
        { name: 'name', label: 'Database Name' },
        { name: 'storage_size', label: 'Storage size' },
        { name: 'collectionsLength', label: 'Collections' },
        { name: 'index_count', label: 'Indexes' },
      ]}
      onItemClick={onDatabaseClick}
      onDeleteItemClick={onDeleteDatabaseClick}
      onCreateItemClick={onCreateDatabaseClick}
      onRefreshClick={onRefreshClick}
      renderItem={({
        item: db,
        onItemClick,
        onDeleteItemClick,
        viewType,
        ...props
      }) => {
        return (
          <NamespaceItemCard
            id={db._id}
            key={db._id}
            name={db.name}
            type="database"
            viewType={viewType}
            status={db.status}
            data={[
              {
                label: 'Storage size',
                value: compactBytes(db.storage_size),
                hint: `Uncompressed data size: ${compactBytes(db.data_size)}`,
              },
              {
                label: 'Collections',
                value: compactNumber(db.collectionsLength),
                insights:
                  db.collectionsLength >= 10_000
                    ? {
                        id: 'too-many-collections',
                        title: 'Databases with too many collections',
                        description:
                          "An excessive number of collections and their associated indexes can drain resources and impact your database's performance. In general, try to limit your replica set to 10,000 collections.",
                        learnMoreLink:
                          'https://www.mongodb.com/docs/v6.0/core/data-model-operations/#large-number-of-collections',
                      }
                    : undefined,
              },
              {
                label: 'Indexes',
                value: compactNumber(db.index_count),
              },
            ]}
            onItemClick={onItemClick}
            onItemDeleteClick={onDeleteItemClick}
            {...props}
          ></NamespaceItemCard>
        );
      }}
    ></ItemsGrid>
  );
};

export { DatabasesList };
