import BaseField from "src/admin/components/bibframe/baseField"
import Field from "./field"

export default function Series() {
  return (
    <BaseField name={'Séries'} field={<Field />} />
  );
}