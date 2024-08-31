using Bibliotheca.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bibliotheca.Data
{
    public class BibliothecaContext : DbContext
    {
        public BibliothecaContext(DbContextOptions<BibliothecaContext> options)
            : base(options)
        {
        }

        public DbSet<Bibliotheca.Models.AnimalObservation> AnimalObservation { get; set; } = default!;
    }
}
