import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { AuthenticatedGuard } from 'src/auth/guards/authenticated.guard';
import { AuthRequest } from 'src/auth/types';

@UseGuards(AuthenticatedGuard)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  create(@Req() request: AuthRequest, @Body() createNoteDto: CreateNoteDto) {
    const authorId = request.user.id;
    return this.notesService.create(createNoteDto, authorId);
  }

  @Get()
  findAll(@Req() request: AuthRequest) {
    const authorId = request.user.id;
    return this.notesService.findAll(authorId);
  }

  @Get(':id')
  findOne(@Req() request: AuthRequest, @Param('id') id: string) {
    const authorId = request.user.id;
    return this.notesService.findOne(id, authorId);
  }

  @Patch(':id')
  update(
    @Req() request: AuthRequest,
    @Param('id') id: string,
    @Body() updateNoteDto: CreateNoteDto,
  ) {
    const authorId = request.user.id;
    return this.notesService.update(id, updateNoteDto, authorId);
  }

  @Delete(':id')
  remove(@Req() request: AuthRequest, @Param('id') id: string) {
    const authorId = request.user.id;
    return this.notesService.remove(id, authorId);
  }
}
