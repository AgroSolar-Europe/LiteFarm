import React from 'react';
import AddCropVariety from '../../../components/AddCropVariety/';
import decorators from '../config/decorators';
import ImagePickerWrapper from '../../../containers/ImagePickerWrapper';
import { AddLink } from '../../../components/Typography';
import { chromaticSmallScreen } from '../config/chromatic';

export default {
  title: 'Form/AddCropVariety',
  decorators: decorators,
  component: AddCropVariety,
};

const Template = (args) => <AddCropVariety {...args} />;

const cropEnum = {
  variety: 'VARIETY',
  supplier: 'SUPPLIER',
  seed_type: 'SEED_TYPE',
  life_cycle: 'LIFE_CYCLE',
};

export const Primary = Template.bind({});
Primary.args = {
  cropEnum: cropEnum,
  disabled: true,
  crop: {
    crop_common_name: 'Apricot',
    crop_genus: 'Prunus',
    crop_group: 'Fruit and nuts',
    crop_id: 31,
    crop_photo_url: 'https://litefarm.nyc3.cdn.digitaloceanspaces.com/default_crop/apricot.jpg',
    crop_subgroup: 'Pome fruits and stone fruits',
    crop_translation_key: 'APRICOT',
  },
  match: {
    params: {
      crop_id: '31',
    },
  },
  useHookFormPersist: () => ({}),
  imageUploader: (
    <ImagePickerWrapper>
      <AddLink>{'Add image'}</AddLink>
    </ImagePickerWrapper>
  ),
};
Primary.parameters = {
  ...chromaticSmallScreen,
};
