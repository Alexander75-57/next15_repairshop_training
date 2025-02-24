'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
    insertTicketSchema,
    type insertTicketSchemaType,
    type selectTicketSchemaType,
} from '@/zod-schema/ticket';
import { selectCustomerSchemaType } from '@/zod-schema/customer';

import { InputWhithLabel } from '@/components/inputs/InputWithLabel';
import TextAreaWithLabel from '@/components/inputs/textAreaWithLabel';
import { SelectWhithLabel } from '@/components/inputs/SelectWithLabel';
import { CheckBoxWhithLabel } from '@/components/inputs/CheckBoxWithLabel';

import { useAction } from 'next-safe-action/hooks';
import { saveTicketAction } from '@/app/actions/saveTicketAction';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';
import { DisplayServerActionResponse } from '@/components/DisplayServerActionResponse';

type Props = {
    customer: selectCustomerSchemaType;
    ticket?: selectTicketSchemaType;
    techs?: {
        id: string;
        description: string;
    }[];
    isEditable?: boolean;
    isManager?: boolean | undefined;
};

export default function TicketForm({
    customer,
    ticket,
    techs,
    isEditable = true,
    isManager = false,
}: Props) {
    const { toast } = useToast();

    const defaultValues: insertTicketSchemaType = {
        id: ticket?.id ?? '(New)', // при ?? принимает первое значение
        customersid: ticket?.customersid ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech.toLowerCase() ?? 'new-ticket@example.com',
    };

    const form = useForm<insertTicketSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    });

    //add server ---------- // rename execute to executeSave
    const {
        execute: executeSave, // rename execute to executeSave
        result: saveResult,
        isExecuting: isSaving,
        reset: resetSaveAction,
    } = useAction(saveTicketAction, {
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

    async function submitForm(data: insertTicketSchemaType) {
        //console.log(data);
        executeSave(data);
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {ticket?.id && isEditable
                        ? `Edit Ticket # ${ticket.id}`
                        : ticket?.id
                        ? `View Ticket # ${ticket.id}`
                        : 'New Ticket Form'}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    {/* <p>{JSON.stringify(form.getValues())}</p> // checking only data without form  */}
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWhithLabel<insertTicketSchemaType>
                            fieldTitle="Titel"
                            nameInSchema="title"
                            className="w-full"
                            {...form.register('title')}
                        />
                        <TextAreaWithLabel<insertTicketSchemaType>
                            fieldTitle="Description"
                            nameInSchema="description"
                            className="w-full"
                            {...form.register('description')}
                        />
                        <CheckBoxWhithLabel<insertTicketSchemaType>
                            fieldTitle="Completed"
                            nameInSchema="completed"
                            message="Completed"
                            disabled={!isEditable}
                            {...form.register('completed')}
                        />
                        <InputWhithLabel<insertTicketSchemaType>
                            fieldTitle="Tech"
                            nameInSchema="tech"
                            className="w-full"
                            {...form.register('tech')}
                        />
                        <div className="flex flex-row gap-4">
                            <Button
                                type="submit"
                                disabled={!isEditable || isSaving}
                            >
                                {isSaving && (
                                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Save
                            </Button>
                            <Button
                                type="reset"
                                variant="secondary"
                                disabled={!isEditable}
                                onClick={() => {
                                    form.reset();
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

function TechSelect({
    techs,
    isManager,
}: {
    techs: { id: string; description: string }[];
    isManager: boolean;
}: Props) {
    /* const isManager = Array.isArray(techs); */ // delete as add isManager to type Props

    const { toast } = useToast();

    const defaultValues: insertTicketSchemaType = {
        id: ticket?.id ?? '(New)', // при ?? принимает первое значение
        customersid: ticket?.customersid ?? customer.id,
        title: ticket?.title ?? '',
        description: ticket?.description ?? '',
        completed: ticket?.completed ?? false,
        tech: ticket?.tech.toLowerCase() ?? 'new-ticket@example.com',
    };

    const form = useForm<insertTicketSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertTicketSchema),
        defaultValues,
    });

    //add server ---------- // rename execute to executeSave
    const {
        execute: executeSave, // rename execute to executeSave
        result: saveResult,
        isExecuting: isSaving,
        reset: resetSaveAction,
    } = useAction(saveTicketAction, {
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

    async function submitForm(data: insertTicketSchemaType) {
        //console.log(data);
        executeSave(data);
    }

    return (
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {ticket?.id && isEditable
                        ? `Edit Ticket # ${ticket.id}`
                        : ticket?.id
                        ? `View Ticket # ${ticket.id}`
                        : 'New Ticket Form'}
                </h2>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(submitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    {/* <p>{JSON.stringify(form.getValues())}</p> // checking only data without form  */}
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWhithLabel<insertTicketSchemaType>
                            fieldTitle="Titel"
                            nameInSchema="title"
                            disabled={!isEditable}
                        />
                        {/*  <InputWhithLabel<insertTicketSchemaType>
                            fieldTitle="Tech"
                            nameInSchema="tech"
                            disabled={true}
                        /> */}
                        {isManager ?? techs ? (
                            <SelectWhithLabel<insertTicketSchemaType>
                                fieldTitle="Tech ID"
                                nameInSchema="tech"
                                data={[
                                    {
                                        id: 'new-tiket@example.com',
                                        description: 'new-tiket@example.com',
                                    },
                                    ...techs,
                                ]}
                            />
                        ) : (
                            <InputWhithLabel<insertTicketSchemaType>
                                fieldTitle="Tech"
                                nameInSchema="tech"
                                disabled={true}
                            />
                        )}

                        {/* <CheckBoxWhithLabel<insertTicketSchemaType>
                            fieldTitle="Complited"
                            nameInSchema="completed"
                            message="Yes"
                        /> */}
                        {ticket?.id ? (
                            <CheckBoxWhithLabel<insertTicketSchemaType>
                                fieldTitle="Complited"
                                nameInSchema="completed"
                                message="Yes"
                                disabled={!isEditable}
                            />
                        ) : null}

                        <div className="mt-4 space-y-2">
                            <h3 className="text-lg">Customer Info</h3>
                            <hr className="w-4/5" />
                            <p>
                                {customer.firstName} {customer.lastName}
                            </p>
                            <p>{customer.address1}</p>
                            {customer.address2 ? (
                                <p>{customer.address2}</p>
                            ) : null}
                            <p>
                                {customer.city}, {customer.state} {customer.zip}
                            </p>
                            <hr className="w-4/5" />
                            <p>{customer.email}</p>
                            <p>Phone: {customer.phone}</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <TextAreaWithLabel<insertTicketSchemaType>
                            fieldTitle="Description"
                            nameInSchema="description"
                            className="h-96"
                            disabled={!isEditable}
                        />

                        {isEditable ? (
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
                        ) : null}
                    </div>
                </form>
            </Form>
        </div>
    );
}
