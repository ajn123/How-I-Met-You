<?php

namespace App\Enums;

use App\Traits\EnumTrait;

enum Social: string
{
    use EnumTrait;

    case TWITTER = 'twitter';
    case FACEBOOK = 'facebook';
    case INSTAGRAM = 'instagram';
    case YOUTUBE = 'youtube';

    case TWITCH = 'twitch';

}
