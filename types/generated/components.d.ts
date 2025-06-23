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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'character.star-level-data': CharacterStarLevelData;
      'skill-description-by-levels.skill-description-by-level': SkillDescriptionByLevelsSkillDescriptionByLevel;
    }
  }
}
