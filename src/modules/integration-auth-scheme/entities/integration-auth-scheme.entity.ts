/*
 * Copyright (c) 2026 SoftwarEnTalla
 * Licencia: MIT
 * Contacto: softwarentalla@gmail.com
 * CEOs: 
 *       Persy Morell Guerra      Email: pmorellpersi@gmail.com  Phone : +53-5336-4654 Linkedin: https://www.linkedin.com/in/persy-morell-guerra-288943357/
 *       Dailyn García Domínguez  Email: dailyngd@gmail.com      Phone : +53-5432-0312 Linkedin: https://www.linkedin.com/in/dailyn-dominguez-3150799b/
 *
 * CTO: Persy Morell Guerra
 * COO: Dailyn García Domínguez and Persy Morell Guerra
 * CFO: Dailyn García Domínguez and Persy Morell Guerra
 *
 * Repositories: 
 *               https://github.com/SoftwareEnTalla 
 *
 *               https://github.com/apokaliptolesamale?tab=repositories
 *
 *
 * Social Networks:
 *
 *              https://x.com/SoftwarEnTalla
 *
 *              https://www.facebook.com/profile.php?id=61572625716568
 *
 *              https://www.instagram.com/softwarentalla/
 *              
 *
 *
 */

import { Column, Entity, OneToOne, JoinColumn, ChildEntity, ManyToOne, OneToMany, ManyToMany, JoinTable, Index, Check, Unique } from 'typeorm';
import { BaseEntity } from './base.entity';
import { CreateIntegrationAuthSchemeDto, UpdateIntegrationAuthSchemeDto, DeleteIntegrationAuthSchemeDto } from '../dtos/all-dto';
import { IsArray, IsBoolean, IsDate, IsInt, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import GraphQLJSON from 'graphql-type-json';
import { plainToInstance } from 'class-transformer';



@ChildEntity('integrationauthscheme')
@ObjectType()
export class IntegrationAuthScheme extends BaseEntity {
  @ApiProperty({
    type: String,
    nullable: false,
    description: "Nombre de la instancia de IntegrationAuthScheme",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Nombre de la instancia de IntegrationAuthScheme", nullable: false })
  @Column({ type: 'varchar', length: 100, nullable: false, comment: 'Este es un campo para nombrar la instancia IntegrationAuthScheme' })
  private name!: string;

  @ApiProperty({
    type: String,
    description: "Descripción de la instancia de IntegrationAuthScheme",
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: "Descripción de la instancia de IntegrationAuthScheme", nullable: false })
  @Column({ type: 'varchar', length: 255, nullable: false, default: "Sin descripción", comment: 'Este es un campo para describir la instancia IntegrationAuthScheme' })
  private description!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Código del esquema',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Código del esquema', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 40, unique: true, comment: 'Código del esquema' })
  code!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Nombre visible del esquema',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Nombre visible del esquema', nullable: false })
  @Column({ type: 'varchar', nullable: false, length: 120, comment: 'Nombre visible del esquema' })
  displayName!: string;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Requiere clientId',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Requiere clientId', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Requiere clientId' })
  requiresClientId!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Requiere apiKey',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Requiere apiKey', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Requiere apiKey' })
  requiresApiKey!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Requiere clientSecret',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Requiere clientSecret', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Requiere clientSecret' })
  requiresClientSecret!: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
    description: 'Requiere accessToken',
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { description: 'Requiere accessToken', nullable: false })
  @Column({ type: 'boolean', nullable: false, default: false, comment: 'Requiere accessToken' })
  requiresAccessToken!: boolean;

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales del esquema',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales del esquema', nullable: true })
  @Column({ type: 'json', nullable: true, comment: 'Metadatos adicionales del esquema' })
  metadata?: Record<string, any> = {};

  protected executeDslLifecycle(): void {
    // No se definieron business-rules en el DSL.
  }

  // Relación con BaseEntity (opcional, si aplica)
  // @OneToOne(() => BaseEntity, { cascade: true })
  // @JoinColumn()
  // base!: BaseEntity;

  constructor() {
    super();
    this.type = 'integrationauthscheme';
  }

  // Getters y Setters
  get getName(): string {
    return this.name;
  }
  set setName(value: string) {
    this.name = value;
  }
  get getDescription(): string {
    return this.description;
  }

  // Métodos abstractos implementados
  async create(data: any): Promise<BaseEntity> {
    Object.assign(this, data);
    this.executeDslLifecycle();
    this.modificationDate = new Date();
    return this;
  }
  async update(data: any): Promise<BaseEntity> {
    Object.assign(this, data);
    this.executeDslLifecycle();
    this.modificationDate = new Date();
    return this;
  }
  async delete(id: string): Promise<BaseEntity> {
    this.id = id;
    return this;
  }

  // Método estático para convertir DTOs a entidad con sobrecarga
  static fromDto(dto: CreateIntegrationAuthSchemeDto): IntegrationAuthScheme;
  static fromDto(dto: UpdateIntegrationAuthSchemeDto): IntegrationAuthScheme;
  static fromDto(dto: DeleteIntegrationAuthSchemeDto): IntegrationAuthScheme;
  static fromDto(dto: any): IntegrationAuthScheme {
    // plainToInstance soporta todos los DTOs
    return plainToInstance(IntegrationAuthScheme, dto);
  }
}
