<?php

namespace App\Enums;

use App\Traits\EnumTrait;
use Filament\Support\Contracts\HasLabel;

enum SocialMediaTypes: string implements HasLabel
{
    use EnumTrait;
    case TWITTER = 'twitter';
    case FACEBOOK = 'facebook';
    case INSTAGRAM = 'instagram';
    case YOUTUBE = 'youtube';
    case TWITCH = 'twitch';

    public function getLabel(): ?string
    {
        return match ($this) {
            self::TWITTER => 'Twitter',
            self::FACEBOOK => 'Facebook',
            self::INSTAGRAM => 'Instagram',
            self::YOUTUBE => 'Youtube',
            self::TWITCH => 'Twitch',
        };
    }
}
