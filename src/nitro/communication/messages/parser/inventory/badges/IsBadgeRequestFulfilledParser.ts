﻿import { IMessageDataWrapper } from 'nitro-renderer/src/core/communication/messages/IMessageDataWrapper';
import { IMessageParser } from 'nitro-renderer/src/core/communication/messages/IMessageParser';

export class IsBadgeRequestFulfilledParser implements IMessageParser
{
    private _requestCode: string;
    private _fulfilled: boolean;

    public flush(): boolean
    {
        return true;
    }

    public parse(wrapper: IMessageDataWrapper): boolean
    {
        if(!wrapper) return false;

        this._requestCode = wrapper.readString();
        this._fulfilled = wrapper.readBoolean();

        return true;
    }

    public get requestCode(): string
    {
        return this._requestCode;
    }

    public get fulfilled(): boolean
    {
        return this._fulfilled;
    }
}
