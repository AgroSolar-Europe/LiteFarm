/*
 *  Copyright 2024 LiteFarm.org
 *  This file is part of LiteFarm.
 *
 *  LiteFarm is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  LiteFarm is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU General Public License for more details, see <https://www.gnu.org/licenses/>.
 */
import { ChangeEvent } from 'react';
import Table from '../../../components/Table';
import PureSearchBarWithBackdrop from '../../PopupFilter/PureSearchWithBackdrop';
import NoSearchResults from '../../../components/Card/NoSearchResults';
import ClearFiltersButton, {
  ClearFiltersButtonType,
} from '../../../components/Button/ClearFiltersButton';
import type { AnimalInventory } from '../../../containers/Animals/Inventory/useAnimalInventory';
import AnimalsFilter from '../../../containers/Animals/AnimalsFilter';
import { TableV2Column, TableKind } from '../../Table/types';
import type { Dispatch, SetStateAction } from 'react';
import styles from './styles.module.scss';
import clsx from 'clsx';
import { sumObjectValues } from '../../../util';

const HEIGHTS = {
  filterAndSearch: 64,
  containerPadding: 32,
};
const usedHeight = sumObjectValues(HEIGHTS);

export type SearchProps = {
  searchString: string | null | undefined;
  setSearchString: Dispatch<SetStateAction<string[]>>;
  placeHolderText: string;
  searchResultsText: string;
};

const PureAnimalInventory = ({
  filteredInventory,
  animalsColumns,
  zIndexBase,
  isDesktop,
  searchProps,
  onSelectInventory,
  handleSelectAllClick,
  selectedIds,
  totalInventoryCount,
  isFilterActive,
  clearFilters,
  isLoading,
  containerHeight,
}: {
  filteredInventory: AnimalInventory[];
  animalsColumns: TableV2Column[];
  zIndexBase: number;
  isDesktop: boolean;
  searchProps: SearchProps;
  onSelectInventory: (event: ChangeEvent<HTMLInputElement>, row: AnimalInventory) => void;
  handleSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedIds: string[];
  totalInventoryCount: number;
  isFilterActive: boolean;
  clearFilters: () => void;
  isLoading: boolean;
  containerHeight?: number;
}) => {
  if (isLoading) {
    return null;
  }

  const { searchString, setSearchString, placeHolderText, searchResultsText } = searchProps;
  const hasSearchResults = filteredInventory.length !== 0;

  const tableMaxHeight = !isDesktop || !containerHeight ? undefined : containerHeight - usedHeight;

  return (
    <>
      <div
        className={clsx(
          isDesktop ? styles.searchAndFilterDesktop : styles.searchAndFilter,
          styles.searchAndFilterCommon,
        )}
      >
        <PureSearchBarWithBackdrop
          value={searchString}
          onChange={(e: any) => setSearchString(e.target.value)}
          isSearchActive={!!searchString}
          placeholderText={placeHolderText}
          zIndexBase={zIndexBase}
          isDesktop={isDesktop}
          className={clsx(isDesktop ? styles.searchBarDesktop : styles.searchBar)}
        />
        <AnimalsFilter isFilterActive={isFilterActive} />
        <div
          className={clsx(
            isDesktop ? styles.searchResultsDesktop : styles.searchResults,
            styles.searchResultsText,
            isFilterActive ? styles.filterActive : '',
          )}
        >
          {searchResultsText}
        </div>
        <div className={isDesktop ? styles.clearButtonWrapperDesktop : ''}>
          <ClearFiltersButton
            type={isDesktop ? ClearFiltersButtonType.TEXT : ClearFiltersButtonType.ICON}
            isFilterActive={isFilterActive}
            onClick={clearFilters}
          />
        </div>
      </div>
      <div className={clsx(isDesktop ? '' : styles.tableWrapper, styles.tableWrapperCommon)}>
        {!totalInventoryCount || hasSearchResults ? (
          <Table
            kind={TableKind.V2}
            alternatingRowColor={true}
            columns={animalsColumns}
            data={filteredInventory}
            shouldFixTableLayout={isDesktop}
            minRows={totalInventoryCount}
            dense={false}
            showHeader={isDesktop}
            onCheck={onSelectInventory}
            handleSelectAllClick={handleSelectAllClick}
            selectedIds={selectedIds}
            stickyHeader={isDesktop}
            maxHeight={tableMaxHeight}
            spacerRowHeight={isDesktop ? 96 : 120}
            headerClass={styles.headerClass}
          />
        ) : (
          <NoSearchResults
            className={clsx(isDesktop ? styles.noSearchResultsDesktop : styles.noSearchResults)}
            searchTerm={searchString}
            includeFiltersInClearSuggestion
          />
        )}
      </div>
    </>
  );
};

export default PureAnimalInventory;
