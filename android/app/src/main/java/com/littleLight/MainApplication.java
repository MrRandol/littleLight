package com.littleLight;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.masteratul.exceptionhandler.ReactNativeExceptionHandlerPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.rnfs.RNFSPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

// React Native FS
import com.rnfs.RNFSPackage;
// React native sqlite
import org.pgsqlite.SQLitePluginPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeExceptionHandlerPackage(),
            new RNZipArchivePackage(),
            new RNFetchBlobPackage(), 
          new RNFSPackage(), // React native FS
          new SQLitePluginPackage() //React native sqlite
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    long size = 50L * 1024L * 1024L; // 50 MB 
    com.facebook.react.modules.storage.ReactDatabaseSupplier.getInstance(getApplicationContext()).setMaximumSize(size);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
