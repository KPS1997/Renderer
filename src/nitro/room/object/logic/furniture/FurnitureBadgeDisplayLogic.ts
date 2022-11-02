import { RoomObjectVariable, StringDataType } from '../../../../../api';
import { PixiApplicationProxy } from '../../../../../pixi-proxy';
import { RoomObjectUpdateMessage } from '../../../../../room';
import { RoomObjectBadgeAssetEvent } from '../../../events/RoomObjectBadgeAssetEvent';
import { RoomObjectWidgetRequestEvent } from '../../../events/RoomObjectWidgetRequestEvent';
import { ObjectDataUpdateMessage, ObjectGroupBadgeUpdateMessage } from '../../../messages';
import { FurnitureLogic } from './FurnitureLogic';

export class FurnitureBadgeDisplayLogic extends FurnitureLogic
{
    public getEventTypes(): string[]
    {
        const types = [RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING, RoomObjectBadgeAssetEvent.LOAD_BADGE];

        return this.mergeTypes(super.getEventTypes(), types);
    }

    public processUpdateMessage(message: RoomObjectUpdateMessage): void
    {
        super.processUpdateMessage(message);

        if (!this.object) return;

        if (message instanceof ObjectDataUpdateMessage)
        {
            const data = message.data;

            if (data instanceof StringDataType) this.updateBadge(data.getValue(1));

            return;
        }

        if (message instanceof ObjectGroupBadgeUpdateMessage)
        {
            if (message.assetName !== 'loading_icon')
            {
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BADGE_ASSET_NAME, message.assetName);
                this.object.model.setValue(RoomObjectVariable.FURNITURE_BADGE_IMAGE_STATUS, 1);

                this.update(PixiApplicationProxy.instance.ticker.lastTime);
            }

            return;
        }
    }

    public useObject(): void
    {
        if (!this.object || !this.eventDispatcher) return;

        this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent(RoomObjectWidgetRequestEvent.BADGE_DISPLAY_ENGRAVING, this.object));
    }

    protected updateBadge(badgeId: string): void
    {
        if (badgeId === '') return;

        if (this.eventDispatcher)
        {
            this.object.model.setValue(RoomObjectVariable.FURNITURE_BADGE_IMAGE_STATUS, -1);

            this.eventDispatcher.dispatchEvent(new RoomObjectBadgeAssetEvent(RoomObjectBadgeAssetEvent.LOAD_BADGE, this.object, badgeId, false));
        }
    }
}
