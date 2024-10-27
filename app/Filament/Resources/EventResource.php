<?php

namespace App\Filament\Resources;

use App\Filament\Resources\EventResource\Pages;
use App\Filament\Resources\EventResource\RelationManagers;
use App\Models\Event;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class EventResource extends Resource
{
    protected static ?string $model = Event::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make()
                    ->schema([
                        Forms\Components\Checkbox::make('enabled'),
                        Forms\Components\TextInput::make('name'),
                        Forms\Components\Textarea::make('description'),
                        Forms\Components\DateTimePicker::make('date'),
                        Forms\Components\TextInput::make('url')->label('Website URL'),
                        Forms\Components\TextInput::make('image_url')
                            ->url()
                            ->label('Image URL'),
                    ])
                    ->columns(1),

            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')->searchable(),
                Tables\Columns\TextColumn::make('date'),
                Tables\Columns\BooleanColumn::make('enabled')->searchable(),

            ])
            ->filters([
                Tables\Filters\SelectFilter::make('enabled')
                    ->options([
                        '1' => 'Enabled',
                        '0' => 'Disabled',
                    ])
                    ->default('1'),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\SocialsRelationManager::class,
            RelationManagers\LocationsRelationManager::class,
            RelationManagers\TagsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListEvents::route('/'),
            'create' => Pages\CreateEvent::route('/create'),
            'edit' => Pages\EditEvent::route('/{record}/edit'),
        ];
    }
}
