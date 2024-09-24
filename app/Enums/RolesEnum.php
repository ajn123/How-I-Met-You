<?php

namespace App\Enums;

enum RolesEnum: string
{
    case ADMIN = 'admin';
    case CREATE_EVENTS = 'create events';
    case DELETE_EVENTS = 'delete own events';
    case PUBLISH_EVENTS = 'publish events';

    public function label()
    {
        return match ($this) {
            self::ADMIN => 'Admin',
            self::CREATE_EVENTS => 'Create Events',
            self::DELETE_EVENTS => 'Delete Own Events',
            self::PUBLISH_EVENTS => 'Publish Events',
        };
    }
}
