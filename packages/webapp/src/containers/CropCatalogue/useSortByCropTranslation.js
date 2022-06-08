import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export default function useSortByCropTranslation(crops) {
  const { t } = useTranslation();
  return useMemo(() => {
    return crops.sort((crop_i, crop_j) =>
      t(`crop:${crop_i.crop_translation_key}`)
        .toLowerCase()
        .normalize('NFD')
        .replace(/\W/g, '')
        .trim() >
      t(`crop:${crop_j.crop_translation_key}`)
        .toLowerCase()
        .normalize('NFD')
        .replace(/\W/g, '')
        .trim()
        ? 1
        : -1,
    );
  }, [crops]);
}
