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

import { InputType, Field, Float, Int, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsObject,
  IsUUID,
  ValidateNested,
} from 'class-validator';




@InputType()
export class BaseIntegrationCredentialDto {
  @ApiProperty({
    type: () => String,
    description: 'Nombre de instancia CreateIntegrationCredential',
    example: 'Nombre de instancia CreateIntegrationCredential',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  name: string = '';

  // Propiedades predeterminadas de la clase CreateIntegrationCredentialDto según especificación del sistema

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de creación de la instancia (CreateIntegrationCredential).',
    example: 'Fecha de creación de la instancia (CreateIntegrationCredential).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  creationDate: Date = new Date(); // Fecha de creación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => Date,
    description: 'Fecha de actualización de la instancia (CreateIntegrationCredential).',
    example: 'Fecha de actualización de la instancia (CreateIntegrationCredential).',
    nullable: false,
  })
  @IsDate()
  @IsNotEmpty()
  @Field(() => Date, { nullable: false })
  modificationDate: Date = new Date(); // Fecha de modificación por defecto, con precisión hasta milisegundos

  @ApiProperty({
    type: () => String,
    description:
      'Usuario que realiza la creación de la instancia (CreateIntegrationCredential).',
    example:
      'Usuario que realiza la creación de la instancia (CreateIntegrationCredential).',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  createdBy?: string; // Usuario que crea el objeto

  @ApiProperty({
    type: () => Boolean,
    description: 'Estado de activación de la instancia (CreateIntegrationCredential).',
    example: 'Estado de activación de la instancia (CreateIntegrationCredential).',
    nullable: false,
  })
  @IsBoolean()
  @IsNotEmpty()
  @Field(() => Boolean, { nullable: false })
  isActive: boolean = false; // Por defecto, el objeto no está activo

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Integración propietaria de la credencial',
  })
  @IsUUID()
  @IsNotEmpty()
  @Field(() => String, { description: 'Integración propietaria de la credencial', nullable: false })
  integratorId!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Alias funcional de la credencial',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Alias funcional de la credencial', nullable: false })
  alias!: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Tipo de credencial',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Tipo de credencial', nullable: false })
  credentialType!: string;

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Client ID asociado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Client ID asociado', nullable: true })
  clientId?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'API Key asociada',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'API Key asociada', nullable: true })
  apiKey?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Client Secret asociado',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Client Secret asociado', nullable: true })
  clientSecret?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Access token actual',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Access token actual', nullable: true })
  accessToken?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Refresh token actual',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Refresh token actual', nullable: true })
  refreshToken?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Secreto de webhook',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Secreto de webhook', nullable: true })
  webhookSecret?: string = '';

  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Estado de la credencial',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { description: 'Estado de la credencial', nullable: false })
  status!: string;

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha de expiración',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha de expiración', nullable: true })
  expiresAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha de última rotación',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha de última rotación', nullable: true })
  rotatedAt?: Date = new Date();

  @ApiProperty({
    type: () => Date,
    nullable: true,
    description: 'Fecha prevista de siguiente rotación',
  })
  @IsDate()
  @IsOptional()
  @Field(() => Date, { description: 'Fecha prevista de siguiente rotación', nullable: true })
  nextRotationAt?: Date = new Date();

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Huella o resumen de la credencial',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { description: 'Huella o resumen de la credencial', nullable: true })
  fingerprint?: string = '';

  @ApiProperty({
    type: () => Object,
    nullable: true,
    description: 'Metadatos adicionales de la credencial',
  })
  @IsObject()
  @IsOptional()
  @Field(() => GraphQLJSON, { description: 'Metadatos adicionales de la credencial', nullable: true })
  metadata?: Record<string, any> = {};

  // Constructor
  constructor(partial: Partial<BaseIntegrationCredentialDto>) {
    Object.assign(this, partial);
  }
}




@InputType()
export class IntegrationCredentialDto extends BaseIntegrationCredentialDto {
  // Propiedades específicas de la clase IntegrationCredentialDto en cuestión

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Identificador único de la instancia',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<IntegrationCredentialDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationCredentialDto>): IntegrationCredentialDto {
    const instance = new IntegrationCredentialDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 




@InputType()
export class IntegrationCredentialValueInput {
  @ApiProperty({
    type: () => String,
    nullable: false,
    description: 'Campo de filtro',
  })
  @Field({ nullable: false })
  fieldName: string = 'id';

  @ApiProperty({
    type: () => IntegrationCredentialDto,
    nullable: false,
    description: 'Valor del filtro',
  })
  @Field(() => IntegrationCredentialDto, { nullable: false })
  fieldValue: any; // Permite cualquier tipo
} 




@ObjectType()
export class IntegrationCredentialOutPutDto extends BaseIntegrationCredentialDto {
  // Propiedades específicas de la clase IntegrationCredentialOutPutDto en cuestión

  @ApiProperty({
    type: () => String,
    nullable: true,
    description: 'Identificador único de la instancia',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<IntegrationCredentialOutPutDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<IntegrationCredentialOutPutDto>): IntegrationCredentialOutPutDto {
    const instance = new IntegrationCredentialOutPutDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateIntegrationCredentialDto extends BaseIntegrationCredentialDto {
  // Propiedades específicas de la clase CreateIntegrationCredentialDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a crear',
    example:
      'Se proporciona un identificador de CreateIntegrationCredential a crear \(opcional\) ',
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  // Constructor
  constructor(partial: Partial<CreateIntegrationCredentialDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<CreateIntegrationCredentialDto>): CreateIntegrationCredentialDto {
    const instance = new CreateIntegrationCredentialDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
}



@InputType()
export class CreateOrUpdateIntegrationCredentialDto {
  @ApiProperty({
    type: () => String,
    description: 'Identificador',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  id?: string;

  @ApiProperty({
    type: () => CreateIntegrationCredentialDto,
    description: 'Instancia CreateIntegrationCredential o UpdateIntegrationCredential',
    nullable: true,
  })
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Field(() => CreateIntegrationCredentialDto, { nullable: true })
  input?: CreateIntegrationCredentialDto | UpdateIntegrationCredentialDto; // Asegúrate de que esto esté correcto
}



@InputType()
export class DeleteIntegrationCredentialDto {
  // Propiedades específicas de la clase DeleteIntegrationCredentialDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a eliminar',
    example: 'Se proporciona un identificador de DeleteIntegrationCredential a eliminar',
    default: '',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id: string = '';

  @ApiProperty({
    type: () => String,
    description: 'Lista de identificadores de instancias a eliminar',
    example:
      'Se proporciona una lista de identificadores de DeleteIntegrationCredential a eliminar',
    default: [],
  })
  @IsString()
  @IsOptional()
  @Field(() => String, { nullable: true })
  ids?: string[];
}



@InputType()
export class UpdateIntegrationCredentialDto extends BaseIntegrationCredentialDto {
  // Propiedades específicas de la clase UpdateIntegrationCredentialDto en cuestión

  @ApiProperty({
    type: () => String,
    description: 'Identificador de instancia a actualizar',
    example: 'Se proporciona un identificador de UpdateIntegrationCredential a actualizar',
  })
  @IsString()
  @IsNotEmpty()
  @Field(() => String, { nullable: false })
  id!: string;

  // Constructor
  constructor(partial: Partial<UpdateIntegrationCredentialDto>) {
    super(partial);
    Object.assign(this, partial);
  }

  // Método estático para construir la instancia
  static build(data: Partial<UpdateIntegrationCredentialDto>): UpdateIntegrationCredentialDto {
    const instance = new UpdateIntegrationCredentialDto(data);
    instance.creationDate = new Date(); // Actualiza la fecha de creación al momento de la creación
    instance.modificationDate = new Date(); // Actualiza la fecha de modificación al momento de la creación
    return instance;
  }
} 



