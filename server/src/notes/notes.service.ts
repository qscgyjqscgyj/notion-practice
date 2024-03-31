import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {
    this.prisma = prisma;
  }

  create(createNoteDto: CreateNoteDto, authorId: string) {
    return this.prisma.note.create({
      data: {
        title: createNoteDto.title,
        authorId,
      },
    });
  }

  findAll(authorId: string) {
    return this.prisma.note.findMany({
      where: {
        authorId,
      },
    });
  }

  findOne(id: string, authorId: string) {
    return this.prisma.note.findUnique({
      where: {
        id,
        authorId,
      },
      include: {
        categories: {
          include: {
            links: true,
          },
        },
      },
    });
  }

  update(id: string, updateNoteDto: CreateNoteDto, authorId: string) {
    return this.prisma.note.update({
      where: {
        id,
        authorId,
      },
      data: {
        title: updateNoteDto.title,
      },
    });
  }

  remove(id: string, authorId: string) {
    return this.prisma.note.delete({
      where: {
        id,
        authorId,
      },
    });
  }
}
