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

import { useTranslation } from 'react-i18next';
import clsx from 'clsx';
import GeneralDetails, { type GeneralDetailsProps } from './General';
import UniqueDetails, { type UniqueDetailsProps } from './Unique';
import OtherDetails, { type OtherDetailsProps } from './Other';
import Origin, { type OriginProps } from './Origin';
import ExpandableItem from '../../../Expandable/ExpandableItem';
import useExpandable from '../../../Expandable/useExpandableItem';
import { AnimalOrBatchKeys } from '../../../../containers/Animals/types';
import { type FormMethods } from './type';
import styles from './styles.module.scss';

enum sectionKeys {
  GENERAL,
  ORIGIN,
  UNIQUE,
  OTHER,
}

export type AnimalDetailsProps = {
  formMethods: FormMethods;
  generalDetailProps: Omit<GeneralDetailsProps, 't' | 'formMethods' | 'animalOrBatch'>;
  uniqueDetailsProps: Omit<UniqueDetailsProps, 't' | 'formMethods'>;
  otherDetailsProps: Omit<OtherDetailsProps, 't' | 'formMethods' | 'animalOrBatch'>;
  originProps: Omit<OriginProps, 't' | 'formMethods'>;
};

const AnimalDetails = ({
  formMethods,
  generalDetailProps,
  uniqueDetailsProps,
  otherDetailsProps,
  originProps,
}: AnimalDetailsProps) => {
  const { expandedIds, toggleExpanded } = useExpandable({ isSingleExpandable: true });
  const { t } = useTranslation(['translation', 'common', 'animal']);
  const commonProps = { t, formMethods };

  const sections = [
    {
      key: sectionKeys.GENERAL,
      title: t('ANIMAL.ADD_ANIMAL.GENERAL_DETAILS'),
      content: (
        <GeneralDetails
          {...commonProps}
          {...generalDetailProps}
          animalOrBatch={AnimalOrBatchKeys.ANIMAL}
        />
      ),
    },
    {
      key: sectionKeys.UNIQUE,
      title: t('ANIMAL.ADD_ANIMAL.UNIQUE_DETAILS'),
      content: <UniqueDetails {...commonProps} {...uniqueDetailsProps} />,
    },
    {
      key: sectionKeys.OTHER,
      title: t('ANIMAL.ADD_ANIMAL.OTHER_DETAILS'),
      content: (
        <OtherDetails
          {...commonProps}
          {...otherDetailsProps}
          animalOrBatch={AnimalOrBatchKeys.ANIMAL}
        />
      ),
    },
    {
      key: sectionKeys.ORIGIN,
      title: t('ANIMAL.ADD_ANIMAL.ORIGIN'),
      content: <Origin {...commonProps} {...originProps} />,
    },
  ];

  return (
    <div className={styles.detailsWrapper}>
      {sections.map(({ key, title, content }) => {
        const isExpanded = expandedIds.includes(key);

        return (
          <div key={key} className={clsx(styles.section, isExpanded && styles.expanded)}>
            <ExpandableItem
              itemKey={key}
              isExpanded={isExpanded}
              onClick={() => toggleExpanded(key)}
              mainContent={title}
              expandedContent={<div className={styles.expandedContentWrapper}>{content}</div>}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AnimalDetails;
