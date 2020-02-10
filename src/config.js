
export const config = {
  host: 'http://51.75.252.210',
  directus: 'http://51.75.252.210:8082',
  directus_files: '/uploads/_/originals/',
    // host: 'http://localhost',
    typeCard: {
        ordre: {
            label: 'ordre',
        },
        troupe: {
            label: 'troupe',
        },
        tir: {
            label: 'tir',
        },
        cavalerie: {
            label: 'cavalerie',
            limite: 6,
        },
        artillerie: {
            label: 'artillerie',
            limite: 4,
        },
        elite: {
            label: 'elite',
            limite: 1,
        },
        unique: {
            label: 'unique',
            limite: 1,
        },
    }
}