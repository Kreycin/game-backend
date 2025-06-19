import type { Schema, Struct } from '@strapi/strapi';

export interface EffectsEffect extends Struct.ComponentSchema {
  collectionName: 'components_effects_effects';
  info: {
    displayName: 'Effect';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Effect_Icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    Effect_Name: Schema.Attribute.String;
  };
}

export interface EnhancementsEnhancement extends Struct.ComponentSchema {
  collectionName: 'components_enhancements_enhancements';
  info: {
    displayName: 'Enhancement';
  };
  attributes: {
    Description: Schema.Attribute.Blocks;
    Enhancement_Icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
  };
}

export interface SkillsSkill extends Struct.ComponentSchema {
  collectionName: 'components_skills_skills';
  info: {
    displayName: 'Skill';
    icon: 'cog';
  };
  attributes: {
    Skill_Description: Schema.Attribute.Blocks;
    skill_effects: Schema.Attribute.Component<'effects.effect', true>;
    Skill_Icon: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Skill_Name: Schema.Attribute.String;
    Skill_Type: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'effects.effect': EffectsEffect;
      'enhancements.enhancement': EnhancementsEnhancement;
      'skills.skill': SkillsSkill;
    }
  }
}
