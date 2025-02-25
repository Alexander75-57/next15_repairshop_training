'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    insertCustomerSchema,
    selectCustomerSchemaType,
    type insertCustomerSchemaType,
} from '@/zod-schema/customer';

import { InputWhithLabel } from '@/components/inputs/InputWithLabel';
import TextAreaWithLabel from '@/components/inputs/textAreaWithLabel';
import { SelectWhithLabel } from '@/components/inputs/SelectWithLabel';
import { CheckBoxWhithLabel } from '@/components/inputs/CheckBoxWithLabel';

import { StateArray } from '@/constants/StatesArray';
/* import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'; */

import { useAction } from 'next-safe-action/hooks';
import { saveCustomerAction } from '@/app/actions/saveCustomerAction';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { DisplayServerActionResponse } from '@/components/DisplayServerActionResponse';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

type Props = {
    customer?: selectCustomerSchemaType;
    isManager?: boolean | undefined;
};

export default function CustomerForm({ customer, isManager = false }: Props) {
    // const { getPermission /*, getPermissions */, isLoading } =
    //     useKindeBrowserClient();
    // const isManager = !isLoading && getPermission('manager')?.isGranted;
    // deleted as add isManager and change to:

    const { toast } = useToast();

    const searchParams = useSearchParams();
    const hasCustomerId = searchParams.get('customerId');
    const emptyValue: insertCustomerSchemaType = {
        id: 0,
        firstName: '',
        lastName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        phone: '',
        email: '',
        notes: '',
        active: true,
    };

    //another method as in documentation
    /*  const permObj = getPermissions();
    const isAuthorisate =
        !isLoading &&
        permObj.permissions.some(
            (perm => perm === 'manager' || perm === 'admin'
        ); */

    const defaultValues: insertCustomerSchemaType = hasCustomerId
        ? {
              id: customer?.id ?? 0,
              firstName: customer?.firstName ?? '',
              lastName: customer?.lastName ?? '',
              address1: customer?.address1 ?? '',
              address2: customer?.address2 ?? '',
              city: customer?.city ?? '',
              state: customer?.state ?? '',
              zip: customer?.zip ?? '',
              phone: customer?.phone ?? '',
              email: customer?.email ?? '',
              notes: customer?.notes ?? '',
              active: customer?.active ?? true,
          }
        : emptyValue;

    const form = useForm<insertCustomerSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    });

    useEffect(() => {
        form.reset(hasCustomerId ? defaultValues : emptyValue);
    }, [searchParams.get('customerId')]); //eslint-disable-line react-hooks/exhaustive-deps

    //add server ---------- // rename execute to executeSave
    const {
        execute: executeSave, // rename execute to executeSave
        result: saveResult,
        isExecuting: isSaving,
        reset: resetSaveAction,
    } = useAction(saveCustomerAction, {
        onSuccess: (data) => {
            //toast user
            toast({
                variant: 'default',
                title: 'Success',
                description: data?.message,
            });
        },
        onError({ error }) {
            toast({
                variant: 'default',
                title: 'Error',
                description: 'Save Failed',
            });
        },
    });
    //----------------

    async function submitForm(data: insertCustomerSchemaType) {
        //console.log(data);
        executeSave(data);
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {customer?.id ? 'Edit' : 'New'} Customer{' '}
                    {customer?.id ? `#${customer.id}` : 'Form'}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    {/* <p>{JSON.stringify(form.getValues())}</p> // for checking receive data without form  */}
                    {/* add colum of our form */}
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="First Name"
                            nameInSchema="firstName"
                        />

                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="Last Name"
                            nameInSchema="lastName"
                        />

                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="Address 1"
                            nameInSchema="address1"
                        />

                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="Address 2"
                            nameInSchema="address2"
                        />

                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="City"
                            nameInSchema="city"
                        />

                        <SelectWhithLabel<insertCustomerSchemaType>
                            fieldTitle="State"
                            nameInSchema="state"
                            data={StateArray}
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="Zip"
                            nameInSchema="zip"
                        />
                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="Phone"
                            nameInSchema="phone"
                        />
                        <InputWhithLabel<insertCustomerSchemaType>
                            fieldTitle="Email"
                            nameInSchema="email"
                        />
                        <TextAreaWithLabel<insertCustomerSchemaType>
                            fieldTitle="Notes"
                            nameInSchema="notes"
                            className="h-40"
                        />

                        {/* {isLoading ? (
                            <p>Loading...</p>
                        ) : isManager && customer?.id ? ( // add isManager*/}
                        {isManager && customer?.id ? (
                            <CheckBoxWhithLabel<insertCustomerSchemaType>
                                fieldTitle="Active"
                                nameInSchema="active"
                                message="Yes"
                            />
                        ) : null}

                        {/* create buttons */}
                        <div className="flex gap-2">
                            <Button
                                type="submit" /* //type="submit" отправка формы  без click */
                                className="w-3/4"
                                variant="default"
                                title="Save"
                                disabled={isSaving}
                            >
                                {/* Save // change to */}
                                {isSaving ? (
                                    <>
                                        <LoaderCircle className="animate-spin" />{' '}
                                        Saving
                                    </>
                                ) : (
                                    'Save'
                                )}
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                title="Reset"
                                /* onClick={() => form.reset(defaultValues)} */
                                onClick={() => {
                                    form.reset(defaultValues);
                                    resetSaveAction();
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
