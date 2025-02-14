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
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

type Props = {
    customer?: selectCustomerSchemaType;
};

export default function CustomerForm({ customer }: Props) {
    const { getPermission /*, getPermissions */, isLoading } =
        useKindeBrowserClient();

    const isManager = !isLoading && getPermission('manager')?.isGranted;

    //another method as in documentation
    /*  const permObj = getPermissions();
    const isAuthorisate =
        !isLoading &&
        permObj.permissions.some(
            (perm => perm === 'manager' || perm === 'admin'
        ); */

    const defaultValues: insertCustomerSchemaType = {
        id: customer?.id || 0,
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        address1: customer?.address1 || '',
        address2: customer?.address2 || '',
        city: customer?.city || '',
        state: customer?.state || '',
        zip: customer?.zip || '',
        phone: customer?.phone || '',
        email: customer?.email || '',
        notes: customer?.notes || '',

        active: customer?.active ?? true,
    };

    const form = useForm<insertCustomerSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertCustomerSchema),
        defaultValues,
    });

    async function submitForm(data: insertCustomerSchemaType) {
        console.log(data);
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
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

                        {isLoading ? (
                            <p>Loading...</p>
                        ) : isManager && customer?.id ? (
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
                            >
                                Save
                            </Button>

                            <Button
                                type="button"
                                variant="destructive"
                                title="Reset"
                                onClick={() => form.reset(defaultValues)}
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
