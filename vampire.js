
// Who is a vampire's creator?
// How many vampires has a vampire created?
// How many vampires away from the original vampire is a vampire?
// Who is the more senior vampire out of two vampires? (Who is closer to the original vampire)
// Who is the closest common ancestor of two vampires?



class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    // console.log(this.creator);
    if(this.creator) {
      return 1 + this.creator.numberOfVampiresFromOriginal;
    } else {
      return 0;
    }
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.

  /* Helper function creating an array of ancestor objects or ancestor properties if an optional param is passed */
  ancestorArray(prop) {
    if (!this.creator) {
      return prop ? [this[prop]] : [this];
    } else if (prop) {
      return [this[prop], ... this.creator.ancestorArray(prop)];
    } else {
      return [this, ... this.creator.ancestorArray()];
    }
  }

  closestCommonAncestor(vampire) {
    const ancestorsNames = this.ancestorArray('name');
    const compareAncestorsNames = vampire.ancestorArray('name');
    const ancestors = this.ancestorArray();

    const closestCommonName = ancestorsNames
      .filter(name => compareAncestorsNames.includes(name))[0];
    
    return ancestors.find(vamp => vamp.name === closestCommonName);
  }

  

}

module.exports = Vampire;

