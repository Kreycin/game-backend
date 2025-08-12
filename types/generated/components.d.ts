import type { Schema, Struct } from '@strapi/strapi';

export interface CharacterStarLevelData extends Struct.ComponentSchema {
  collectionName: 'components_character_star_level_data';
  info: {
    displayName: 'Star_Level_Data';
    icon: 'check';
  };
  attributes: {
    enhancements: Schema.Attribute.Relation<
      'oneToMany',
      'api::enhancement.enhancement'
    >;
    skill_descriptions: Schema.Attribute.Component<
      'skill-description-by-levels.skill-description-by-level',
      true
    >;
    Star_Level: Schema.Attribute.Enumeration<
      ['star5', 'star8', 'star11', 'star14', 'star16', 'star19']
    >;
  };
}

export interface SkillDescriptionByLevelsSkillDescriptionByLevel
  extends Struct.ComponentSchema {
  collectionName: 'components_skill_description_by_levels_skill_description_by_levels';
  info: {
    displayName: 'Skill_Description_By_Level';
    icon: 'star';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    skill: Schema.Attribute.Relation<'oneToOne', 'api::skill.skill'>;
  };
}

export interface TierListTierCharacterEntry extends Struct.ComponentSchema {
  collectionName: 'components_tier_list_tier_character_entries';
  info: {
    displayName: 'TierCharacterEntry';
    icon: 'archive';
  };
  attributes: {
    condition: Schema.Attribute.String;
    condition_detail: Schema.Attribute.String;
    expert_bonus: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    expert_tag_description: Schema.Attribute.Text;
    highlight: Schema.Attribute.Text;
    tier_list_character: Schema.Attribute.Relation<
      'oneToOne',
      'api::tier-list-character.tier-list-character'
    >;
  };
}

export interface TierListTierRow extends Struct.ComponentSchema {
  collectionName: 'components_tier_list_tier_rows';
  info: {
    displayName: 'TierRow';
    icon: 'chartBubble';
  };
  attributes: {
    def_characters: Schema.Attribute.Component<
      'tier-list.tier-character-entry',
      true
    >;
    dps_characters: Schema.Attribute.Component<
      'tier-list.tier-character-entry',
      true
    >;
    support_characters: Schema.Attribute.Component<
      'tier-list.tier-character-entry',
      true
    >;
    tier_level: Schema.Attribute.Enumeration<
      ['T0', 'T0.5', 'T1', 'T1.5', 'T2', 'T3', 'T4', 'T5']
    >;
    tier_name: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'character.star-level-data': CharacterStarLevelData;
      'skill-description-by-levels.skill-description-by-level': SkillDescriptionByLevelsSkillDescriptionByLevel;
      'tier-list.tier-character-entry': TierListTierCharacterEntry;
      'tier-list.tier-row': TierListTierRow;
    }
  }
}
