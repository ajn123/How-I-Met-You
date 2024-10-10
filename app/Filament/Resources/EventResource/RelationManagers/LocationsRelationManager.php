<?php

namespace App\Filament\Resources\EventResource\RelationManagers;

use Cheesegrits\FilamentGoogleMaps\Fields\Geocomplete;
use Cheesegrits\FilamentGoogleMaps\Fields\Map;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class LocationsRelationManager extends RelationManager
{
    protected static string $relationship = 'locations';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Geocomplete::make('name'),
                Map::make('location')->mapControls([
                    'mapTypeControl' => true,
                    'scaleControl' => true,
                    'rotateControl' => true,
                    'fullscreenControl' => true,
                    'searchBoxControl' => false, // creates geocomplete field inside map
                    'zoomControl' => false,
                ])
                    ->height(fn () => '400px') // map height (width is controlled by Filament options)
                    ->defaultZoom(10) // default zoom level when opening form
                    ->autocomplete('name') // field on form to use as Places geocompletion field
                    ->defaultLocation([38.904974072966, -77.003001885428]) // default for new forms
                    ->clickable(true),

            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                Tables\Columns\TextColumn::make('name'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make(),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
