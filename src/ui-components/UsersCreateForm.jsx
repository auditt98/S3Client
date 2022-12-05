/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { fetchByPath, validateField } from "./utils";
import { Users } from "../models";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { DataStore } from "aws-amplify";
export default function UsersCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    accessKeyId: undefined,
    secretAccessKey: undefined,
  };
  const [accessKeyId, setAccessKeyId] = React.useState(
    initialValues.accessKeyId
  );
  const [secretAccessKey, setSecretAccessKey] = React.useState(
    initialValues.secretAccessKey
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setAccessKeyId(initialValues.accessKeyId);
    setSecretAccessKey(initialValues.secretAccessKey);
    setErrors({});
  };
  const validations = {
    accessKeyId: [],
    secretAccessKey: [],
  };
  const runValidationTasks = async (fieldName, value) => {
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          accessKeyId,
          secretAccessKey,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          await DataStore.save(new Users(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...rest}
      {...getOverrideProps(overrides, "UsersCreateForm")}
    >
      <TextField
        label="Access key id"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessKeyId: value,
              secretAccessKey,
            };
            const result = onChange(modelFields);
            value = result?.accessKeyId ?? value;
          }
          if (errors.accessKeyId?.hasError) {
            runValidationTasks("accessKeyId", value);
          }
          setAccessKeyId(value);
        }}
        onBlur={() => runValidationTasks("accessKeyId", accessKeyId)}
        errorMessage={errors.accessKeyId?.errorMessage}
        hasError={errors.accessKeyId?.hasError}
        {...getOverrideProps(overrides, "accessKeyId")}
      ></TextField>
      <TextField
        label="Secret access key"
        isRequired={false}
        isReadOnly={false}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              accessKeyId,
              secretAccessKey: value,
            };
            const result = onChange(modelFields);
            value = result?.secretAccessKey ?? value;
          }
          if (errors.secretAccessKey?.hasError) {
            runValidationTasks("secretAccessKey", value);
          }
          setSecretAccessKey(value);
        }}
        onBlur={() => runValidationTasks("secretAccessKey", secretAccessKey)}
        errorMessage={errors.secretAccessKey?.errorMessage}
        hasError={errors.secretAccessKey?.hasError}
        {...getOverrideProps(overrides, "secretAccessKey")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={resetStateValues}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
