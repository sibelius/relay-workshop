import React from 'react';
import { useField } from 'formik';
import _TextFieldMaterial from '@material-ui/core/TextField';
import styled from 'styled-components';
import { flexbox, space } from 'styled-system';

export const TextFieldMaterial = styled(_TextFieldMaterial)`
  ${flexbox}
  ${space}
`;

type Props = {
  name: string;
};
const TextField = (props: Props) => {
  const { name, ...rest } = props;

  const [field] = useField(name);

  return <TextFieldMaterial {...field} {...rest} />;
};

export default TextField;
